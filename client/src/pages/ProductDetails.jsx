import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!user) return;
    api
      .get("/favorites")
      .then((res) => {
        const favIds = res.data.map((p) => p._id);
        setIsFavorite(favIds.includes(id));
      })
      .catch((err) => console.error(err));
  }, [id, user]);

  const toggleFavorite = async () => {
    try {
      if (!isFavorite) {
        await api.post(`/favorites/${id}`);
      } else {
        await api.delete(`/favorites/${id}`);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <section className="page">Loading...</section>;

  return (
    <section className="page product-details">
      <img src={product.imageUrl} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>{product.inStock ? "In stock" : "Out of stock"}</p>
        {user && (
          <button
            className={isFavorite ? "btn-primary" : "btn-outline"}
            onClick={toggleFavorite}
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
