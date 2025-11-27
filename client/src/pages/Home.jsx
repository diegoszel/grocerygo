import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="page home">
      <div className="home-hero">
        <h1>Welcome to GroceryGo</h1>
        <p>Your modern online grocery store demo for FS Web 2025.</p>
        <Link to="/products" className="btn-primary">
          Start shopping
        </Link>
      </div>
    </section>
  );
};

export default Home;
