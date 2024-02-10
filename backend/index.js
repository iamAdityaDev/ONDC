const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const api = 'AIzaSyDT__9TFdPA53ZAzP_l30ScEiEl-Caz_yM';
const genAI = new GoogleGenerativeAI(api);

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/', (req, res) => {
  try {
    // Read products from the JSON file
    const data = fs.readFileSync('../frontend/src/assets/products.json', 'utf8');
    let products = JSON.parse(data);

    // Sort products based on their scores
    products.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    // Send the sorted products as response
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/addProduct', async (req, res) => {
  const { heading, desc, price, brand, warranty, offline, shipment, availability } = req.body;
  try {
    // Generate score using AI model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Provide an overall score for the product on a scale of 1 to 10. 
        The score should incorporate various attributes provided in a product carrying information: heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}, and availability: ${availability}., ensuring accuracy to differentiate and rank similar products. Consider the following constraints while generating the score:
        1)Exclude irrelevant attributes for specific products. For instance, clothing products do not require warranty information.
        2)Ensure the price is practical. For example, a bottle priced at 10,000 rupees would not be considered economical.
        3)Product description should be comprehensive and informative.
        4)Products requiring warranty should have precise warranty information. For instance, electronics should specify whether the warranty covers software and hardware.
        5)Consider offline assistance as a key factor, particularly targeting customers who prefer traditional offline support over online services.
         If there is
          1)irrelevant information about the attribute
          2)incomplete information
          3) no offline assistance
           then score must be very low as it doesnt even matches the hygine of the information provided under the product
           At final you have to mark every attribute some score like this 
          For Example :
          -Availibility
          - Description: 1.5/10
          - Brand: 7/10
          - Price: 6.5/10
          - Warranty Information : 3/10(If needed as per product)
          - Offline Assistance: 7/10
          - Shipment Details: 9/10 (assuming standard shipping options are available)
          - Availibilty
          then calculate overall score by taking average of all these
          **Note: Score should be of the format--> 2.1, 4, 7.8 like this.., and Score may contain decimal numbers to produce a more precise score and
         evaluate score by strictly judging all the factors correctly
         No need to print anything other than this Score should be of the format--> 2.1, 4 like this..
         Do not print anything other than the score. Just a final floating point number.`;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;
    const score = generatedResponse.text();

    // Read existing products from the JSON file
    const data = fs.readFileSync('../frontend/src/assets/products.json', 'utf8');
    let products = JSON.parse(data);

    // Append new product to the array
    products.push({ heading, desc, price, brand, score });

    // Write the updated array back to the JSON file
    fs.writeFileSync('../frontend/src/assets/products.json', JSON.stringify(products, null, 2), 'utf8');

    res.status(200).send('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
