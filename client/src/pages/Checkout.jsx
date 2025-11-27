import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    paymentMethod: "card"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  if (items.length === 0 && !submitted) {
    return (
      <section className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="page">
        <h1>Thank you!</h1>
        <p>Your order has been placed successfully.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
            />
          </label>
          <label>
            Address
            <input
              name="address"
              required
              value={form.address}
              onChange={handleChange}
            />
          </label>
          <label>
            City
            <input
              name="city"
              required
              value={form.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Payment method
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="card">Credit card</option>
              <option value="cash">Cash on delivery</option>
            </select>
          </label>
          <button type="submit" className="btn-primary">
            Place order
          </button>
        </form>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <ul>
            {items.map((i) => (
              <li key={i.id}>
                {i.quantity} × {i.name} (${i.price.toFixed(2)} each)
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "0.5rem" }}>
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </p>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
