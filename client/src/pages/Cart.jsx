import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <section className="page">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn-primary">
          Go to products
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Your cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} each</p>
                <div className="cart-item-controls">
                  <label>
                    Qty:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Summary</h2>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
