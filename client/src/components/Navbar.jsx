import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          GroceryGo
        </Link>
      </div>
      <nav className="navbar-center">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/about">About</NavLink>
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="navbar-right">
        <NavLink to="/cart" className="cart-link">
          🛒
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </NavLink>
        {user ? (
          <>
            <span className="navbar-hello">Hi, {user.name}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn-secondary">
              Login
            </NavLink>
            <NavLink to="/register" className="btn-primary">
              Register
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
