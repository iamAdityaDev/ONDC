// import { GoogleGenerativeAI } from '@google/generative-ai';
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
    token: "p57Ii2VsCWRzihocNtIl2yAiUQvO22euvjbaXECM", // This is your trial API key
  });

// const API_KEY = 'AIzaSyC0aRuYnxBm-wNn5PGsjO2O_M9IFz87GA8';

// const genAI = new GoogleGenerativeAI(API_KEY);

async function translateProducts(language, productData) {
  try {
    // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    for (const product of productData) {
      const { heading, desc, price } = product;

      const response = await cohere.generate({
        model: "command",
        prompt: `Translate the following product details into ${language}:
        Heading: ${heading}
        Description: ${desc}
        Price: ${price}
        
        Give the final product details in ${language} only.
        `,
        maxTokens: 300,
        temperature: 0.9,
        k: 0,
        stopSequences: [],
        returnLikelihoods: "NONE"
      });

      const translatedText = response.generations[0].text;
      
    //   console.log(prompt)
      console.log(heading)

      console.log(translatedText)
    }
  } catch (error) {
    console.error('Error translating products:', error);
  }
}


const language = 'Marathi';
const productData = [
  {
      // image: Shirt,
      heading: "TURMS",
      desc: "TURMS Men's Crimson Maroon Cotton Blend Mandarin Collar Shirt, Anti Stain & Anti Odor, Comfortable, Water Repellent, Stylish, Casual, Business Work, Party",
      price: "₹1,999"
  },
  {
      // image: Shoes,
      heading: "RED Tape",
      desc: "Red Tape Men's Walking Shoes: Elevate your stride with these stylish and comfortable footwear designed for urban exploration.",
      price: "₹3,999"
  },
  {
      // image: Sports,
      heading: "UNBEATABLE",
      desc: "Unbeatable Polyester Spandex Men's Sports Running Set Compression Shirt + Pants Skin-Tight Long Sleeves Quick Dry Fitness Tracksuit Gym Yoga Suits",
      price: "₹494"
  },
  {
      // image: Kurti,
      heading: "FABCLUB",
      desc: "GoSriKi Women's Printed Kurta Set: Effortlessly chic, this ensemble includes a printed kurta with matching pants and dupatta, offering versatile style for any occasion.",
      price: "₹1,999"
  },
  {
      // image: Wshoes,
      heading: "RED Tape",
      desc: "Longwalk Women and Girls Sneakers: Step into ultimate comfort and style with these versatile shoes, perfect for walking, hitting the gym.",
      price: "₹1,499"
  },
  {
      // image: Womensports,
      heading: "ROCK & ROLL",
      desc: "ROCK & ROLL Women's Workout 2 Piece Outfits Tracksuit Half Sleeve, Viscose Material Crop Tops Joggers Pants Sets Sweatsuits",
      price: "₹1,239"
  },
];

translateProducts(language, productData)

module.export = translateProducts;
