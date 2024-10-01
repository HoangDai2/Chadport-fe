import React, { useEffect, useState } from 'react';
import '../style/Home.css'; // Assuming you add styles here or inline

// Define the shape of the product data
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const Home = () => {
  // Set the type of products as an array of Product
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))  // Ensure that the response is cast to Product[]
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="section section-padding">
      <div className="section-container">
        {/* Block Products */}
        <div className="block block-products">
          <div className="block-title">
            <h2>Best Seller</h2>
          </div>
          <div className="products-container">
            {/* Iterate through products */}
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <a href={`shop-details/${product.id}`}>
                    <img src={product.image} alt={product.title} />
                  </a>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <span className="product-price">${product.price}</span>
                  <div className="product-buttons">
                    <button className="btn-wishlist">Wishlist</button>
                    <button className="btn-add-to-cart">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
