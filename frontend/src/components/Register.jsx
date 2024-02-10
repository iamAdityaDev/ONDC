import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './Register.css';

function RegisterProduct() {
  const [productInfo, setProductInfo] = useState({
    heading: '',
    desc: '',
    brand: '',
    price: '',
    availability: false,
    warranty: '',
    offline: '',
    shipment: ''
  });

  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      closeContainer();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInfo(prevInfo => ({
      ...prevInfo,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = () => {
    const { heading, desc, brand, price, warranty, offline, shipment, availability } = productInfo;
  
    axios.post('http://localhost:5000/api/addProduct', {
      heading,
      desc,
      price,
      brand, // Ensure the name matches the backend (brand instead of productName)
      warranty,
      offline,
      shipment,
      availability
    }) // POST request using Axios
      .then(response => {
        console.log('Product added successfully:', response.data);
        closeContainer();
        window.location.reload();
        console.log('Product Info:', productInfo);
        // Optionally, you can clear the form after successful submission
        setProductInfo({
          heading: '',
          desc: '',
          brand: '',
          price: '',
          availability: false,
          warranty: '',
          offline: '',
          shipment: ''
        });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };
  
  const closeContainer = () => {
    let container = document.getElementById('container_id');
    if (container) {
      container.style.display = "none";
    }
  };

  return (
    <div id='container_id' className='container' ref={containerRef}>
      <div className="header_register">
        <p className="head_text">Register your Product</p>
      </div>
      <label>
        Product Name:
        <input
          type="text"
          name="heading"
          value={productInfo.heading}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="desc"
          value={productInfo.desc}
          onChange={handleChange}
        />
      </label>

      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={productInfo.brand}
          onChange={handleChange}
        />
      </label>

      <label>
        Price:
        <input
          type="text"
          name="price"
          value={productInfo.price}
          onChange={handleChange}
        />
      </label>

      <label className='avail'>
        Availability :
        <input className='check_box'
          type="checkbox"
          name="availability"
          checked={productInfo.availability}
          onChange={handleChange}
        />
      </label>

      <label>
        Warranty Info:
        <input
          type="text"
          name="warranty"
          value={productInfo.warranty}
          onChange={handleChange}
        />
      </label>

      <label>
        Offline Assistance:
        <input
          type="text"
          name="offline"
          value={productInfo.offline}
          onChange={handleChange}
        />
      </label>

      <label>
        Shipment Details:
        <input
          type="text"
          name="shipment"
          value={productInfo.shipment}
          onChange={handleChange}
        />
      </label>

      <button className='submit_but' onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterProduct;
