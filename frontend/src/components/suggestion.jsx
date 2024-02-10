import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './suggestion.css';
import RegisterProduct from './Register';


function Suggestion(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    // let container = document.getElementById('suggestion_id');
    // container.style.display = "flex";
  }, []);

  const handleRegister = () => {
    const { heading, desc, brand, price, warranty, offline, shipment, availability } = props.productInfo;
    
    axios.post('https://backend-catalogue.onrender.com/api/addProduct', {
      heading,
      desc,
      price,
      brand,
      warranty,
      offline,
      shipment,
      availability
    }).then(() => {
      window.location.reload(); 
  })
      .catch(error => {
        console.error('Error adding product:', error);
      });
      let container = document.getElementById('suggestion_id');
      container.style.display = 'flex';
  };

  
  const close_suggest_div=()=>{
    let container = document.getElementById('suggestion_id');
    container.style.display = "none";
    let container2 = document.getElementById('container_id');
    container2.style.display = "flex";
  }

  return (
    <div id='suggestion_id' className='container twoc' ref={containerRef}>
      <div className="header_register">
        <p className="head_text">Suggestions</p>
        <button onClick={close_suggest_div} className="back_suggest">Back</button>
      </div>
      <label className='suggest_head'>
        Product Name
        <p className="suggest">{props.heading}</p>
      </label>

      <label className='suggest_head'>
        Description
        <p className="suggest">{props.desc}</p>
      </label>

      <label className='suggest_head'>
        Price
        <p className="suggest">{props.price}</p>
      </label>

      <label className='suggest_head'>
        Warranty Info
        <p className="suggest">{props.warranty}</p>
      </label>

      <label className='suggest_head'>
        Offline Assistance
        <p className="suggest">{props.offline}</p>
      </label>

      <label className='suggest_head'>
        Shipment Details
        <p className="suggest">{props.shipment}</p>
      </label>
      <label className='suggest_head dialogue'>
        **If you want to make any changes to your product according to suggestions, you can go back and edit it. Once you're confirmed, click on submit to register it.
      </label>
      <button className='next_to_suggest' onClick={handleRegister}>Register</button>
    </div>

  );
}

export default Suggestion;
