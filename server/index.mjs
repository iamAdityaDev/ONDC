import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyC0aRuYnxBm-wNn5PGsjO2O_M9IFz87GA8';

const genAI = new GoogleGenerativeAI(API_KEY);

async function translateProducts(language, productData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    for (const product of productData) {
      const { heading, desc, price } = product;

      const prompt = `Translate the following product details into ${language}:
        Heading: ${heading}
        Description: ${desc}
        Price: ${price}

        Maintain the original product title case and ensure the translated description is concise and clear.
        
        The structure of the output should be as follows
        image: {same}
        heading: {translated heading}
        desc: {translated description}
        price: {translated price}

        Replace the variable in {} with it's proper value
        
        for example: 
        for the product 
        // image: Shirt,
        heading: "TURMS",
        desc: "TURMS Men's Crimson Maroon Cotton Blend Mandarin Collar Shirt, Anti Stain & Anti Odor, Comfortable, Water Repellent, Stylish, Casual, Business Work, Party",
        price: "₹1,999"

        The output should be - 
        // image: Shirt,
        heading: "टर्म्स",
        desc: "टर्म्स पुरुषांचे क्रिमसन मरून कॉटन ब्लेंड मंदारिन कॉलर शर्ट, एंटी स्टेन आणि एंटी गंध, आरामदायक, पाण्याला टिकणारा, स्टाइलिश, कॅज्युअल, व्यवसायिक काम, पार्टी"
        price: "₹ १,९९९"
        
        Do this for each and every product in the language mentioned at that time. Do not miss any product`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const translatedText = response.text();
      
      console.log(heading)

      console.log(translatedText)
    }
  } catch (error) {
    console.error('Error translating products:', error);
  }
}


// const language = 'Marathi';
// const productData = [
//   {
//       // image: Shirt,
//       heading: "TURMS",
//       desc: "TURMS Men's Crimson Maroon Cotton Blend Mandarin Collar Shirt, Anti Stain & Anti Odor, Comfortable, Water Repellent, Stylish, Casual, Business Work, Party",
//       price: "₹1,999"
//   },
//   {
//       // image: Shoes,
//       heading: "RED Tape",
//       desc: "Red Tape Men's Walking Shoes: Elevate your stride with these stylish and comfortable footwear designed for urban exploration.",
//       price: "₹3,999"
//   },
//   {
//       // image: Sports,
//       heading: "UNBEATABLE",
//       desc: "Unbeatable Polyester Spandex Men's Sports Running Set Compression Shirt + Pants Skin-Tight Long Sleeves Quick Dry Fitness Tracksuit Gym Yoga Suits",
//       price: "₹494"
//   },
//   {
//       // image: Kurti,
//       heading: "FABCLUB",
//       desc: "GoSriKi Women's Printed Kurta Set: Effortlessly chic, this ensemble includes a printed kurta with matching pants and dupatta, offering versatile style for any occasion.",
//       price: "₹1,999"
//   },
//   {
//       // image: Wshoes,
//       heading: "RED Tape",
//       desc: "Longwalk Women and Girls Sneakers: Step into ultimate comfort and style with these versatile shoes, perfect for walking, hitting the gym.",
//       price: "₹1,499"
//   },
//   {
//       // image: Womensports,
//       heading: "ROCK & ROLL",
//       desc: "ROCK & ROLL Women's Workout 2 Piece Outfits Tracksuit Half Sleeve, Viscose Material Crop Tops Joggers Pants Sets Sweatsuits",
//       price: "₹1,239"
//   },
// ];

export { translateProducts };
