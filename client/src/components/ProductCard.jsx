import { Link } from "react-router-dom";

const buildImageUrl = (product) => {
  // If DB already has a full URL, use it
  if (product.imageUrl && product.imageUrl.startsWith("http")) {
    return product.imageUrl;
  }

  // Otherwise build a "real-time" Unsplash URL from name + category
  const queryParts = [product.name, product.category, "grocery", "food"]
    .filter(Boolean)
    .join(",");

  return `https://source.unsplash.com/400x300/?${encodeURIComponent(
    queryParts
  )}`;
};

const ProductCard = ({ product, onFavorite, isFavorite, onAddToCart }) => {
  const handleImageError = (e) => {
    // If Unsplash fails, fall back to a stable placeholder
    e.target.onerror = null;
    const seed = encodeURIComponent(product.name || "fallback");
    e.target.src = `https://picsum.photos/seed/${seed}/400/300`;
  };

  return (
    <div className="product-card">
      <img
        src={buildImageUrl(product)}
        alt={product.name}
        onError={handleImageError}
      />
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-category">{product.category}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product._id}`} className="btn-secondary">
            Details
          </Link>
          {onAddToCart && (
            <button
              className="btn-primary"
              type="button"
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          )}
          {onFavorite && (
            <button
              className="btn-outline"
              type="button"
              onClick={() => onFavorite(product._id)}
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
