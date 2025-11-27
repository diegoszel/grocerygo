import { Link } from "react-router-dom";

const ProductCard = ({ product, onFavorite, isFavorite }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-category">{product.category}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product._id}`} className="btn-secondary">
            Details
          </Link>
          {onFavorite && (
            <button
              className={isFavorite ? "btn-primary" : "btn-outline"}
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
