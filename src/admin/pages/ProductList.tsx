// src/admin/pages/ProductList.tsx
import React, { useState, useEffect } from 'react';
import instance from '../../Service';
import { TProduct } from '../../Types/TProduct'; // Import interface TProduct
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get<TProduct[]>('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id?: number) => {
    if (id === undefined) return;
    try {
      await instance.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      showAlert();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img src={product.image_product} alt={product.name} className="img-fluid" style={{ width: '100px' }} />
              </td>
              <td>{product.name}</td>
              <td>${product.price} <span className="text-muted" style={{ textDecoration: 'line-through' }}>(${product.price_sale})</span></td>
              <td>{product.status}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td>
                <ul className="list-unstyled">
                  {product.category.map(cat => (
                    <li key={cat.id}>{cat.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {alertVisible && <div className="alert alert-success position-fixed" style={{ top: '20px', right: '20px' }}>Product deleted successfully!</div>}
    </div>
  );
}

export default ProductList;