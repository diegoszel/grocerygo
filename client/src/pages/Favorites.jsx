import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Favorites = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const loadFavorites = () => {
    api
      .get("/favorites")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!user) return;
    loadFavorites();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      loadFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <section className="page">
        <h1>Favorites</h1>
        <p>Please login to see your favorite products.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Your favorites</h1>
      {products.length === 0 ? (
        <p>You have no favorite products yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onFavorite={toggleFavorite}
              isFavorite={true}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
