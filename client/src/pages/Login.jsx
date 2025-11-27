import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="page">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn-primary" type="submit">
          Login
        </button>
        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
