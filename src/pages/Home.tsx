import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import '../style/Home.css'; // Assuming you add styles here or inline

// Define the shape of the product data
export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
}

const Home = () => {
  // Set the type of products as an array of Product
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data)) // Ensure that the response is cast to Product[]
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    navigate("/shopcart");
  };
  const handleAddWishlist = () => {
    navigate("/wishlist");
  };
  return (
    <section className="section section-padding">
      <div className="section-container">
        {/* Block Products */}
        <div className="block block-products">
          <div className="block-title">
            <h2>Best Seller</h2>
          </div>
          <div className="products-grid">
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
                    <button
                      onClick={() => handleAddWishlist()}
                      className="btn-wishlist"
                    >
                      Wishlist
                    </button>
                    <button
                      onClick={() => handleAddToCart()}
                      className="btn-add-to-cart"
                    >
                      Add to Cart
                    </button>
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
