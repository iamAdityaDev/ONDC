import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';

export default function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend when the component mounts
        axios.get('https://backend-catalogue.onrender.com/api')
            .then(response => {
                // Set the products state with the data received from the backend
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

            console.log(products);
    }, []);

    return (
        <div className='product-container'>
            {products.map((product, index) => (
                <div key={index} className='product-card'>
                    <p className='product-heading'>{product.heading}</p>
                    <p className='product-brand'>{product.brand}</p>
                    <p className='product-desc'>Details : {product.desc}</p>
                    <h2 className='product-price'>Price : {product.price}</h2>
                    <p className='product-warranty'><b>Warranty</b> : {product.warranty}</p>
                    <p className='product-shipment'><b>Shipment</b> : {product.shipment}</p>
                    <h2 className='product-score'>Overall Score : {product.score} / 10</h2>
                </div>
            ))}
        </div>
    );
}
