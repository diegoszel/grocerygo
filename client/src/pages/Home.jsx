import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products", { params: { inStock: true } })
      .then((res) => setProducts(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="home">
      <div className="hero">
        <div>
          <h1>Fresh groceries, delivered fast.</h1>
          <p>
            Browse our selection of fruits, vegetables, snacks and essentials –
            then save your favorites for next time.
          </p>
          <Link to="/products" className="btn-primary">
            Start shopping
          </Link>
        </div>
        <div className="hero-img" aria-hidden="true">
          🥦 🍎 🥛
        </div>
      </div>
      <div className="home-products">
        <h2>Popular picks</h2>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
