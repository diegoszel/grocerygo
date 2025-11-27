import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    category: "",
    inStock: true,
    stockQty: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/products/${id}`)
      .then((res) => {
        const p = res.data;
        setForm({
          name: p.name || "",
          description: p.description || "",
          imageUrl: p.imageUrl || "",
          price: p.price || "",
          category: p.category || "",
          inStock: p.inStock ?? true,
          stockQty: p.stockQty ?? ""
        });
      })
      .catch((err) => console.error(err));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stockQty: Number(form.stockQty)
      };
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <section className="page">
      <h1>{isEdit ? "Edit product" : "New product"}</h1>
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
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </label>
        <label className="checkbox">
          <input
            name="inStock"
            type="checkbox"
            checked={form.inStock}
            onChange={handleChange}
          />
          In stock
        </label>
        <label>
          Stock quantity
          <input
            name="stockQty"
            type="number"
            value={form.stockQty}
            onChange={handleChange}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
    </section>
  );
};

export default AdminProductForm;
