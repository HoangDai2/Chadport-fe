import React, { useState, useEffect } from "react";
import apisphp from "../../Service/api";
import { Variant, Size, Color, TProduct } from "../../Types/TProduct"; // Import các interface cần thiết

const VariantForm = () => {
  const [sizes, setSizes] = useState<Size[]>([]); // Danh sách sizes
  const [colors, setColors] = useState<Color[]>([]); // Danh sách colors
  const [products, setProducts] = useState<TProduct[]>([]); // Danh sách products
  const [formData, setFormData] = useState({
    product_id: "", // Thêm trường product_id
    size_id: "",
    col_id: "",
    quantity: "",
  });

  const [variants, setVariants] = useState<Variant[]>([]); // Danh sách variants hiện tại

  useEffect(() => {
    // Lấy danh sách sizes, colors, và products từ API
    apisphp.get("/sizes").then((res) => setSizes(res.data.data));
    apisphp.get("/colors").then((res) => setColors(res.data.data));
    apisphp.get("/list/products") // Đã sửa lại endpoint đây
      .then((res) => setProducts(res.data.data));
    apisphp.get("/variants").then((res) => {
      setVariants(res.data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await apisphp.post(`/variants/${formData.product_id}`, {
        size_id: formData.size_id,
        col_id: formData.col_id,
        quantity: formData.quantity,
      });
  
      console.log('Variant created:', response.data);
      // Cập nhật danh sách variants sau khi thêm mới
      setVariants((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.error('Error creating variant:', error);
    }
  };
  

  return (
    <div className="container">
      <h2>Manage Variants</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Product Selection */}
        <div className="mb-3">
          <label htmlFor="product_id" className="form-label">
            Product
          </label>
          <select
            className="form-select"
            id="product_id"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Size Selection */}
        <div className="mb-3">
          <label htmlFor="size_id" className="form-label">
            Size
          </label>
          <select
            className="form-select"
            id="size_id"
            name="size_id"
            value={formData.size_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Selection */}
        <div className="mb-3">
          <label htmlFor="col_id" className="form-label">
            Color
          </label>
          <select
            className="form-select"
            id="col_id"
            name="col_id"
            value={formData.col_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Variant
        </button>
      </form>

      <h3>Current Variants</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {variants?.length > 0 ? (
            variants.map((variant) => (
              <tr key={variant.id}>
                <td>{variant.id}</td>
                <td>{variant.product?.name || 'N/A'}</td>
                <td>{variant.size?.name || 'N/A'}</td>
                <td>{variant.color?.name || 'N/A'}</td>
                <td>{variant.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No variants available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VariantForm;
