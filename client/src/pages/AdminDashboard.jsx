import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = () => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="page">
      <h1>Admin dashboard</h1>
      <button
        className="btn-primary"
        type="button"
        onClick={() => navigate("/admin/products/new")}
      >
        New product
      </button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>In stock</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.inStock ? "Yes" : "No"}</td>
              <td>
                <Link to={`/admin/products/${p._id}`}>Edit</Link>{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminDashboard;
