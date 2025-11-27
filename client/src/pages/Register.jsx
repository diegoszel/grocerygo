import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState(
    "Password must contain upper, lower, 4 digits, and a symbol."
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="page">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
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
        {info && <p className="info">{info}</p>}
        {error && <p className="error">{error}</p>}
        <button className="btn-primary" type="submit">
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
