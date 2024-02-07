import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";


export default function Navbar() {
    const [isClicked, setIsClicked] = useState(false);
    const [language, setlanguage] = useState("English");

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const handleLanguage = (lan) => {
        setlanguage(lan);
        console.log(language);
    }


    return (
        <div className='flex p-3 bg-blue-950 text-white justify-between px-12'>
            <h1>Indic Language</h1>
            <form action="" >
                <input type='text' placeholder='search' className='w-[500px] p-1 rounded-sm' />
            </form>
            <div>
                <button onClick={handleClick} className='flex items-center gap-1'>EN <FaChevronDown /></button>
                {
                    isClicked &&
                    <div>
                        <ul className='absolute bg-gray-200 text-black p-4 px-8 right-6 top-14 flex flex-col gap-2'>
                            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage("Telugu")}>English</li>
                            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage("Telugu")}>తెలుగు - Telugu</li>
                            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage("Marathi")}>मराठी - Marathi</li>
                            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage("Kannada")}>ಕನ್ನಡ - Kannada</li>
                            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage("Tamil")}>தமிழ் - Tamil</li>
                            <li className='cursor-pointer hover:text-yellow-600' onClick={() => handleLanguage("Malayalam")}>മലയാളം - Malayalam</li>
                        </ul>

                        <button className='absolute top-3 right-44 bg-yellow-700 p-2 px-6 text-white rounded-md hover:bg-yellow-600' onClick={handleClick}>Save</button>
                    </div>

                }

            </div>
        </div>
    )
}
