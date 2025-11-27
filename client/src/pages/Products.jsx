import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [view, setView] = useState("grid");
  const { user } = useAuth();

  const loadProducts = () => {
    api
      .get("/products", {
        params: { q: query || undefined, category: category || undefined, inStock }
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

  return (
    <section className="page">
      <h1>Products</h1>
      <form className="filters" onSubmit={handleSearch}>
        <input
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label className="checkbox">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          In stock only
        </label>
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
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onFavorite={user ? toggleFavorite : null}
              isFavorite={favorites.includes(p._id)}
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
            {products.map((p) => (
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
