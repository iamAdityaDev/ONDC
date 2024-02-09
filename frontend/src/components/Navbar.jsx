import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
// import { translateProducts } from './index';
import Product from './Product';

export default function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  const [language, setLanguage] = useState('English');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchInitialProducts() {
      try {
        const initialProducts = // products ka list yaha hona chahiye
        setProducts(initialProducts);
      } catch (error) {
        console.error('Error fetching initial products:', error);
        // error message to the user
      }
    }
    fetchInitialProducts();
  }, []);

  const handleLanguage = (lan) => {
    setLanguage(lan);
  };

  // const handleClick = async () => {
  //   setIsClicked(!isClicked);
  //   if (!isClicked) {
  //     try {
  //       const translatedProducts = await Promise.all(products.map(async (product) => {
  //         const translatedProduct = await translateProducts(language, product);
  //         return translatedProduct;
  //       }));
  //       setProducts(translatedProducts);
  //     } catch (error) {
  //       console.error('Error translating products:', error);
  //       // Display an error message to the user
  //     }
  //   }
  // };

  return (
    <div className='flex p-3 bg-blue-950 text-white justify-between px-12'>
      <h1>Indic Language</h1>
      <form action="">
        <input type='text' placeholder='search' className='w-[500px] p-1 rounded-sm' />
      </form>
      <div>
        <button className='flex items-center gap-1'>
          {language} <FaChevronDown />
        </button>
        {isClicked && (
          <div className='absolute bg-gray-200 text-black p-4 px-8 right-6 top-14 flex flex-col gap-2'>
            <li
              className='cursor-pointer hover:text-yellow-600'
              onClick={() => handleLanguage('English')}
            >
              English
            </li>
            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage('Telugu')}>
              తెలుగు - Telugu
            </li>
            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage('Marathi')}>
              मराठी - Marathi
            </li>
            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage('Kannada')}>
                ಕನ್ನಡ - Kannada
            </li>
            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage('Tamil')}>
                தமிழ் - Tamil
            </li>
            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage('Malayalam')}>
                മലയാളം - Malayalam
            </li>
          </div>
        )}
      </div>
      {/* Display translated products */}
      {products.map((product) => (
        <Product key={product.heading} product={product} />
      ))}
    </div>
  );
}
