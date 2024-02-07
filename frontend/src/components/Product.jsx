import React from 'react';
import Shirt from "../assets/shirt.jpeg";
import Shoes from "../assets/shoes.jpeg";
import Sports from "../assets/sports.jpeg";
import Kurti from "../assets/kurti.jpeg";
import Womensports from "../assets/womenSports.jpeg";
import Wshoes from "../assets/wShoes.jpeg";

export default function Product() {
    const products = [
        {
            image: Shirt,
            heading: "TURMS",
            desc: "TURMS Men's Crimson Maroon Cotton Blend Mandarin Collar Shirt, Anti Stain & Anti Odor, Comfortable, Water Repellent, Stylish, Casual, Business Work, Party",
            price: "₹1,999"
        },
        {
            image: Shoes,
            heading: "RED Tape",
            desc: "Red Tape Men's Walking Shoes: Elevate your stride with these stylish and comfortable footwear designed for urban exploration.",
            price: "₹3,999"
        },
        {
            image: Sports,
            heading: "UNBEATABLE",
            desc: "Unbeatable Polyester Spandex Men's Sports Running Set Compression Shirt + Pants Skin-Tight Long Sleeves Quick Dry Fitness Tracksuit Gym Yoga Suits",
            price: "₹494"
        },
        {
            image: Kurti,
            heading: "FABCLUB",
            desc: "GoSriKi Women's Printed Kurta Set: Effortlessly chic, this ensemble includes a printed kurta with matching pants and dupatta, offering versatile style for any occasion.",
            price: "₹1,999"
        },
        {
            image: Wshoes,
            heading: "RED Tape",
            desc: "Longwalk Women and Girls Sneakers: Step into ultimate comfort and style with these versatile shoes, perfect for walking, hitting the gym.",
            price: "₹1,499"
        },
        {
            image: Womensports,
            heading: "ROCK & ROLL",
            desc: "ROCK & ROLL Women's Workout 2 Piece Outfits Tracksuit Half Sleeve, Viscose Material Crop Tops Joggers Pants Sets Sweatsuits",
            price: "₹1,239"
        },
    ];

    return (
        <div className='flex'>
            {products.map((product, index) => (
                <div key={index} className='w-[15%] m-3 flex flex-col items-center cursor-pointer hover:shadow-xl shadow-gray-600 p-2 hover:bg-gray-200'>
                    <img src={product.image} className='w-full' alt={product.heading} />
                    <h1 className='text-xl font-semibold'>{product.heading}</h1>
                    <p>{product.desc}</p>
                    <h2 className='text-xl font-semibold'>{product.price}</h2>
                </div>
            ))}
        </div>
    );
}

