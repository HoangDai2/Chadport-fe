import React, { useState, useEffect } from 'react';
import instance from '../../Service';
import { TProduct } from '../../Types/TProduct'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([]);

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

  const deleteProduct = async (id: number) => {
    if (id === undefined) return;
    try {
      await instance.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product!');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>STT</th>
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
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{i+1}</td>
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
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default ProductList;