import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';

export default function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend when the component mounts
        axios.get('http://localhost:5000/api')
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
                    {/* <img src={product.image} className='product-image' alt={product.heading} /> */}
                    <p className='product-heading'>{product.heading}</p>
                    <p className='product-brand'>{product.brand}</p>
                    <p className='product-desc'>Details : {product.desc}</p>
                    <h2 className='product-price'>Price : {product.price}</h2>
                    {/* <h2 className='product-score'>{product.score}</h2> */}
                </div>
            ))}
        </div>
    );
}
