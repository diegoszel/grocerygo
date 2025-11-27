import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
      <h1>Admin – Products</h1>
      <div className="admin-actions">
        <Link to="/admin/products/new" className="btn-primary">
          + New product
        </Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock qty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.stockQty}</td>
              <td>
                <Link to={`/admin/products/${p._id}`} className="btn-secondary">
                  Edit
                </Link>
                <button
                  className="btn-outline"
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
