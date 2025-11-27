import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const emptyProduct = {
  name: "",
  description: "",
  imageUrl: "",
  price: 0,
  category: "",
  inStock: true,
  stockQty: 0
};

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState(emptyProduct);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((p) => ({
      ...p,
      [name]:
        type === "checkbox" ? checked : name === "price" || name === "stockQty"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, product);
      } else {
        await api.post("/products", product);
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
            value={product.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            required
            value={product.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL
          <input
            name="imageUrl"
            required
            value={product.imageUrl}
            onChange={handleChange}
          />
        </label>
        <label>
          Category
          <input
            name="category"
            required
            value={product.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Stock quantity
          <input
            name="stockQty"
            type="number"
            min="0"
            required
            value={product.stockQty}
            onChange={handleChange}
          />
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            name="inStock"
            checked={product.inStock}
            onChange={handleChange}
          />
          In stock
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </section>
  );
};

export default AdminProductForm;
