import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const buildImageUrl = (product) => {
  if (!product) return "";
  if (product.imageUrl && product.imageUrl.startsWith("http")) {
    return product.imageUrl;
  }
  const queryParts = [product.name, product.category, "grocery", "food"]
    .filter(Boolean)
    .join(",");
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(
    queryParts
  )}`;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
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

  const handleImageError = (e) => {
    e.target.onerror = null;
    const seed = encodeURIComponent(product?.name || "fallbackdetails");
    e.target.src = `https://picsum.photos/seed/${seed}/600/400`;
  };

  if (!product) return <section className="page">Loading...</section>;

  return (
    <section className="page product-details">
      <img
        src={buildImageUrl(product)}
        alt={product.name}
        onError={handleImageError}
      />
      <div>
        <h1>{product.name}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>{product.inStock ? "In stock" : "Out of stock"}</p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button
            className="btn-primary"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          {user && (
            <button
              className="btn-outline"
              type="button"
              onClick={toggleFavorite}
            >
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
