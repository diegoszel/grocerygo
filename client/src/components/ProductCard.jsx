import { Link } from "react-router-dom";

const ProductCard = ({ product, onFavorite, isFavorite, onAddToCart }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://picsum.photos/seed/fallback/400/300";
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
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
