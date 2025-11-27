import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const CATEGORIES = [
  "Fruit",
  "Vegetables",
  "Dairy",
  "Drinks",
  "Snacks",
  "Pantry",
  "Meat",
  "Seafood"
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [view, setView] = useState("grid");

  const { user } = useAuth();
  const { addToCart } = useCart();

  const loadProducts = () => {
    api
      .get("/products", {
        params: {
          q: query || undefined,
          category: category || undefined,
          inStock
        }
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const loadFavorites = () => {
    if (!user) return;
    api
      .get("/favorites")
      .then((res) => setFavorites(res.data.map((p) => p._id)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadFavorites();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const toggleFavorite = async (id) => {
    try {
      if (!favorites.includes(id)) {
        await api.post(`/favorites/${id}`);
      } else {
        await api.delete(`/favorites/${id}`);
      }
      loadFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  const getVisibleProducts = () => {
    let filtered = [...products];

    if (minPrice !== "") {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
    }

    if (maxPrice !== "") {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
    }

    filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "newest") {
        const at = new Date(a.createdAt || 0).getTime();
        const bt = new Date(b.createdAt || 0).getTime();
        if (at === bt) return b.name.localeCompare(a.name);
        return bt - at;
      }
      return 0;
    });

    return filtered;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <section className="page">
      <h1>Products</h1>
      <form className="filters" onSubmit={handleSearch}>
        <input
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          In stock only
        </label>

        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
          <option value="newest">Newest first</option>
        </select>

        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="grid">Card view</option>
          <option value="table">Table view</option>
        </select>

        <button type="submit" className="btn-secondary">
          Apply
        </button>
      </form>

      {view === "grid" ? (
        <div className="product-grid">
          {visibleProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onFavorite={user ? toggleFavorite : null}
              isFavorite={favorites.includes(p._id)}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>In stock</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.inStock ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Products;
