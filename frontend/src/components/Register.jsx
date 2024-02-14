import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import Suggestion from './suggestion';


function RegisterProduct() {
  const [headingInfo, setHeadingInfo] = useState('');
  const [descInfo, setDescInfo] = useState('');
  const [priceInfo, setPriceInfo] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState('');
  const [offlineInfo, setOfflineInfo] = useState('');
  const [shipmentInfo, setShipmentInfo] = useState('');
  const [brandInfo, setBrandInfo] = useState('');

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
    let container2 = document.getElementById('suggestion_id');
    container2.style.display = 'none';
    let container = document.getElementById('container_id');
    container.style.display = 'flex';
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInfo(prevInfo => ({
      ...prevInfo,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const fetchHeadingInfo = async() => {
    try {
      const response = await axios.post('https://backend-catalogue.onrender.com/api/suggestName', productInfo);
      setHeadingInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDescInfo = async() => {
    try {
      const response = await axios.post('https://backend-catalogue.onrender.com/api/suggestDesc', productInfo);
      setDescInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPriceInfo = async() => {
    try {
      const response = await axios.post('https://backend-catalogue.onrender.com/api/suggestPrice', productInfo);
      setPriceInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWarrantyInfo = async() => {
    try {
      const response = await axios.post('https://backend-catalogue.onrender.com/api/suggestWarranty', productInfo);
      setWarrantyInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOfflineInfo = async() => {
    try {
      const response = await axios.post('https://backend-catalogue.onrender.com/api/suggestOffline', productInfo);
      setOfflineInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchShipmentInfo = async() => {
    try {
      const response = await axios.post('https://backend-catalogue.onrender.com/api/suggestShipment', productInfo);
      setShipmentInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const register_back=()=>{
    let container = document.getElementById('container_id');
    container.style.display = 'none';
  }

  const handleNext = async () => {
    // await handleRegister(); // Wait for registration process to complete
    const { heading, desc, brand, price, warranty, offline, shipment, availability } = productInfo;
    setHeadingInfo(heading);
    setDescInfo(desc);
    setBrandInfo(brand);
    setPriceInfo(price);
    setWarrantyInfo(warranty);
    setOfflineInfo(offline);
    setShipmentInfo(shipment);
    let container = document.getElementById('container_id');
    container.style.display = 'flex';
    let container2 = document.getElementById('suggestion_id');
    container2.style.display = 'flex';
  };
  

  return (
    <div id='container_id' className='container' ref={containerRef}>
      <div className="header_register">
        <p className="head_text">Register your Product</p>
        <button onClick={register_back} className="regis_back">Back</button>
      </div>
      <label >
        Product Name:
        <input
          required
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

      <button className='submit_but' onClick={() => { handleNext(); fetchDescInfo(); fetchHeadingInfo(); fetchOfflineInfo(); fetchPriceInfo(); fetchShipmentInfo(); fetchWarrantyInfo(); }}>Next</button>
      <Suggestion heading={headingInfo} desc={descInfo} brand={brandInfo} price={priceInfo} warranty={warrantyInfo} shipment={shipmentInfo} offline={offlineInfo} productInfo={productInfo} />
    </div>
  );
}

export default RegisterProduct;
