import React, { useState } from 'react';
import instance from '../../Service';
import { TProduct } from '../../Types/TProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const initialProductState: TProduct = {
  id: 0,
  cat_id: 0,
  title: '',
  name: '',
  status: '',
  col_id: 0,
  size_id: 0,
  brand_id: 0,
  description: '',
  quantity: 0,
  image_product: '',
  price: 0,
  price_sale: 0,
  type: '',
  date_create: '',
  date_update: '',
  category: []
};

function ProductAdd() {
  const [product, setProduct] = useState<TProduct>(initialProductState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = parseInt(e.target.value, 10); // Chuyển đổi giá trị thành số
    const categoryName = e.target.options[e.target.selectedIndex].text;
    setProduct({ ...product, category: [{ id: selectedCategory, name: categoryName, parent_id: null, status: '', date_create: '', date_update: '' }] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productWithId = { ...product, id: Date.now() }; // Tạo ID duy nhất
    try {
      await instance.post('/products', productWithId);
      toast.success('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product!');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-md-4 col-form-label">Name</label>
          <div className="col-md-8">
            <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="title" className="col-md-4 col-form-label">Title</label>
          <div className="col-md-8">
            <input type="text" className="form-control" id="title" name="title" value={product.title} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="price" className="col-md-4 col-form-label">Price</label>
          <div className="col-md-8">
            <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="price_sale" className="col-md-4 col-form-label">Price Sale</label>
          <div className="col-md-8">
            <input type="number" className="form-control" id="price_sale" name="price_sale" value={product.price_sale} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="status" className="col-md-4 col-form-label">Status</label>
          <div className="col-md-8">
            <select className="form-select" id="status" name="status" value={product.status} onChange={handleChange} required>
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="quantity" className="col-md-4 col-form-label">Quantity</label>
          <div className="col-md-8">
            <input type="number" className="form-control" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="description" className="col-md-4 col-form-label">Description</label>
          <div className="col-md-8">
            <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="type" className="col-md-4 col-form-label">Type</label>
          <div className="col-md-8">
            <input type="text" className="form-control" id="type" name="type" value={product.type} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="image_product" className="col-md-4 col-form-label">Image URL</label>
          <div className="col-md-8">
            <input type="text" className="form-control" id="image_product" name="image_product" value={product.image_product} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="category" className="col-md-4 col-form-label">Category</label>
          <div className="col-md-8">
            <select className="form-select" id="category" name="category" onChange={handleCategoryChange} required>
              <option value="1">Sportswear</option>
              <option value="2">Footwear</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default ProductAdd;