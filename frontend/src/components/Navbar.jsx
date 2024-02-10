import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Product from './Product';
import Register from './Register';

export default function Navbar() {
  const [products, setProducts] = useState([]);
  // const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  useEffect(() => {
    async function fetchInitialProducts() {
      try {
        // Fetch products here
        let container = document.getElementById('container_id');
        container.style.display = 'none';
        const initialProducts = [];
        setProducts(initialProducts);
      } catch (error) {
        console.error('Error fetching initial products:', error);
      }
    }
    fetchInitialProducts();
  }, []);


  const handleRegisterProduct = () => {
    // setIsRegisterClicked(true);
    let container = document.getElementById('container_id');
    container.style.display = 'flex';
  };

  return (
    <div className="whole">
    <Register/>
    <div className='navbar'>
      <h1 className='nav_head'>Catalogue Scoring</h1>
      <button className='register-product-btn' onClick={handleRegisterProduct}>
        Register Product
      </button>
      
      {/* Display translated products */}
      {products.map((product) => (
        <Product key={product.heading} product={product} />
      ))}
    </div>
    </div>
  );
}
