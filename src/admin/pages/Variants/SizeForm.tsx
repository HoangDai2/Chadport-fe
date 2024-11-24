import React, { useState, useEffect } from "react";
import apisphp from "../../../Service/api"; // Import API client được cấu hình
import { Size } from "../../../Types/TProduct";

const SizeForm: React.FC = () => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [formData, setFormData] = useState<Partial<Size>>({ name: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch sizes on component mount
  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const response = await apisphp.get("/sizes"); // Sử dụng apisphp
      setSizes(response.data.data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apisphp.put(`/sizes/${editingId}`, formData); // Sử dụng apisphp
      } else {
        await apisphp.post("/sizes", formData); // Sử dụng apisphp
      }
      fetchSizes();
      resetForm();
    } catch (error: any) {
      setError(error.response?.data.message || "Error saving size");
    }
  };

  const handleEdit = (size: Size) => {
    setFormData(size);
    setEditingId(size.id || null);
  };

  const handleDelete = async (id: number) => {
    try {
      await apisphp.delete(`/sizes/${id}`); // Sử dụng apisphp
      fetchSizes();
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h2>Manage Sizes</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Size Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size.id}>
              <td>{size.id}</td>
              <td>{size.name}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(size)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(size.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeForm;
