import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    api
      .get("/favorites")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      loadFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="page">
      <h1>Your favorites</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite products yet.</p>
      ) : (
        <div className="product-grid">
          {favorites.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onFavorite={toggleFavorite}
              isFavorite
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
