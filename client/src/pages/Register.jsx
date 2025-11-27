import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4,})(?=.*[!@%$#^&*\-_()]).{8,}$/;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must have 8 chars, lowercase, uppercase, 4 digits and a symbol."
      );
      return;
    }
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <section className="page auth-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form">
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
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-primary">
          Register
        </button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
