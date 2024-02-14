const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const api = "AIzaSyDT__9TFdPA53ZAzP_l30ScEiEl-Caz_yM";
const genAI = new GoogleGenerativeAI(api);

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Catalogue Scoring - ONDC backend!");
});

app.get("/api/", (req, res) => {
  try {
    // Read products from the JSON file
    const data = fs.readFileSync(
      "../frontend/src/assets/products.json",
      "utf8"
    );
    let products = JSON.parse(data);

    // Sort products based on their scores
    products.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    // Send the sorted products as response
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/addProduct", async (req, res) => {
  const {
    heading,
    desc,
    price,
    brand,
    warranty,
    offline,
    shipment,
    availability,
  } = req.body;
  try {
    // Generate score using AI model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Provide an overall score for the product on a scale of 1 to 10. 

        The score should incorporate various attributes provided in a product carrying information: heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}, and availability: ${availability}., ensuring accuracy to differentiate and rank similar productsThe scoring process must adhere to a specific priority order:

        Product Description and Name: This is the most crucial factor in determining the score. The comprehensiveness and informativeness of the product description significantly impact the rating. A clear and detailed description helps customers understand the product better, leading to a higher score.
        
        Price: The pricing of the product plays a significant role in its overall score. It's essential to ensure that the price is practical and reasonable. Unrealistically high prices can negatively affect the score, while competitive pricing can lead to a higher rating.
        
        Warranty Information: For products that require a warranty, precise warranty information is vital. Customers need to know the duration of the warranty and what it covers, particularly for electronics where coverage for both software and hardware is essential. Clear warranty terms contribute positively to the product score.
        
        Shipment Details: The details regarding shipment, including whether it's local or international, impact the overall convenience of purchasing the product. Quick and reliable shipment options contribute positively to the score, while complicated or slow delivery processes may lower it.
        
        Offline Assistance: Consideration of offline assistance is crucial, especially for customers who prefer traditional support channels over online services. Availability of offline assistance, such as in-person support or store assistance, can enhance the overall customer experience and influence the product score positively.
        
        Constraints to consider while generating the score:

        Details that is provided in fields like product Description, offline Assistance, warranty... evaluate accordingly that are they sufficient? !!,
        
        Exclude irrelevant attributes: Ensure that attributes irrelevant to specific products are excluded from the evaluation. For instance, clothing products do not require warranty information, so it should not affect their score.
        
        Ensure practical pricing: Verify that the price of the product is practical and realistic. Products with unreasonably high prices should receive a lower score.
        
        Comprehensive product description: Evaluate the completeness and informativeness of the product description. A detailed description should lead to a higher score, while incomplete or vague descriptions may lower it.
        
        Precise warranty information: Products requiring warranty coverage should provide precise details about the warranty terms. For electronics, it's essential to specify whether the warranty covers software, hardware, or both.
        
        Consider offline assistance: Take into account the availability of offline assistance, particularly for customers who prefer traditional support channels. Products offering offline assistance options should receive a higher score.

        Also take reference to this data

        {
          "category": "Electronics",
          "heading": "Dell XPS 13 Laptop",
          "desc": "13.4 inch FHD+ InfinityEdge Display, Intel Core i7, 16GB RAM, 512GB SSD, Windows 11",
          "price": "120000",
          "brand": "Dell",
          "score": "9",
          "warranty": "Yes, 3 years warranty",
          "offline": "Yes",
          "shipment": "Local"
        },
        {
          "category": "Electronics",
          "heading": "Lenovo ThinkPad X1 Carbon",
          "desc": "14 inch 4K HDR Display, Intel Core i5, 16GB RAM, 512GB SSD, Windows 11 Pro",
          "price": "135000",
          "brand": "Lenovo",
          "score": "7.8",
          "warranty": "Yes, 5 years warranty",
          "offline": "Yes",
          "shipment": "International"
        },
        {
          "category": "Electronics",
          "heading": "HP Spectre x360 Convertible Laptop",
          "desc": "15.6 inch 4K OLED Touchscreen, Intel Core i9, 32GB RAM, 1TB SSD, Windows 11",
          "price": "180000",
          "brand": "HP",
          "score": "9.2",
          "warranty": "Yes, 2 years warranty",
          "offline": "No",
          "shipment": "Local"
        },
        {
          "category": "Electronics",
          "heading": "Asus ROG Zephyrus G14 Gaming Laptop",
          "desc": "14 inch QHD Display, AMD Ryzen 9, 32GB RAM, 1TB SSD, NVIDIA GeForce RTX 3080",
          "price": "200000",
          "brand": "Asus",
          "score": "8.9",
          "warranty": "Yes, 2 years warranty",
          "offline": "Yes",
          "shipment": "International"
        },
        {
          "category": "Clothes",
          "heading": "Men's Formal Suit",
          "desc": "Premium quality tailored suit for formal occasions",
          "price": "50000",
          "brand": "TailorMade",
          "score": "8.1",
          "warranty": "No",
          "offline": "Yes",
          "shipment": "Local"
        },
        {
          "category": "Food",
          "heading": "Gourmet Cheese Collection",
          "desc": "Assorted gourmet cheese selection from around the world",
          "price": "15000",
          "brand": "CheeseLuxe",
          "score": "8.5",
          "warranty": "No",
          "offline": "No",
          "shipment": "Local"
        },
        {
          "category": "Accessories",
          "heading": "Smartwatch",
          "desc": "High-tech smartwatch with health and fitness tracking features",
          "price": "25000",
          "brand": "TechWear",
          "score": "7.6",
          "warranty": "Yes, 1 year warranty",
          "offline": "Yes",
          "shipment": "Local"
        }
        {
          "heading": "Dell XPS 13 Laptop",
          "desc": "13.4 inch FHD+ InfinityEdge Display, Intel Core i7, 16GB RAM, 512GB SSD, Windows 11",
          "price": "120000",
          "brand": "Dell",
          "score": "8.5",
          "warranty": "Yes, 3 years warranty",
          "offline": "Yes",
          "shipment": "Local"
        },
        {
          "heading": "Lenovo ThinkPad X1 Carbon",
          "desc": "14 inch 4K HDR Display, Intel Core i5, 16GB RAM, 512GB SSD, Windows 11 Pro",
          "price": "135000",
          "brand": "Lenovo",
          "score": "8.2",
          "warranty": "Yes, 5 years warranty",
          "offline": "Yes",
          "shipment": "International"
        },
        {
          "heading": "HP Spectre x360 Convertible Laptop",
          "desc": "15.6 inch 4K OLED Touchscreen, Intel Core i9, 32GB RAM, 1TB SSD, Windows 11",
          "price": "180000",
          "brand": "HP",
          "score": "9.0",
          "warranty": "Yes, 2 years warranty",
          "offline": "No",
          "shipment": "Local"
        },
        {
          "heading": "Asus ROG Zephyrus G14 Gaming Laptop",
          "desc": "14 inch QHD Display, AMD Ryzen 9, 32GB RAM, 1TB SSD, NVIDIA GeForce RTX 3080",
          "price": "200000",
          "brand": "Asus",
          "score": "9.5",
          "warranty": "Yes, 2 years warranty",
          "offline": "Yes",
          "shipment": "International"
        },
        {
          "heading": "Gaming Laptop",
          "desc": "Very fast and smooth",
          "price": "67,999 Rs",
          "brand": "MSI",
          "score": "3.8",
          "warranty": "1 year",
          "offline": "yes",
          "shipment": ""
        }
        {
          "heading": "Huawei MateBook X Pro Laptop",
          "desc": "13.9 inch 3K Touchscreen, Intel Core i7, 16GB RAM, 1TB SSD, Windows 11",
          "price": "170000",
          "brand": "Huawei",
          "score": "8.3",
          "warranty": "Yes, 2 years warranty",
          "offline": "No",
          "shipment": "Local"
        },
        {
          "heading": "laptop",
          "desc": "good",
          "price": "89,999 Rs",
          "brand": "Huwawe",
          "score": "2.3",
          "warranty": "1 year",
          "offline": "yes",
          "shipment": ""
        }
        Output the final score in the format: 2.1, 4, 7.8, etc., where decimal numbers may be used for precision in the scoring process.
        
        **Note : You just have to strictly generate a score from 1-10 as a number as in the format of (2.1, 4, 7.8), no other characters should be there, from the format that I suggested.`;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;
    const score = generatedResponse.text();

    // Read existing products from the JSON file
    const data = fs.readFileSync(
      "../frontend/src/assets/products.json",
      "utf8"
    );
    let products = JSON.parse(data);

    // Append new product to the array
    products.push({
      heading,
      desc,
      price,
      brand,
      score,
      warranty,
      offline,
      shipment,
    });

    // Write the updated array back to the JSON file
    fs.writeFileSync(
      "../frontend/src/assets/products.json",
      JSON.stringify(products, null, 2),
      "utf8"
    );

    res.status(200).send("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/suggestName", async (req, res) => {
  const { heading, desc, price, brand, warranty, offline, shipment } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Consider the following data of a product:
    heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}

    Identify limitations in this product and suggest improvements that can be made in product name by considering if there is irrelevant information about the attribute and incomplete information. Compare changes with similar products existing in the market, remember I need this suggestion should be smart and of 1 line.
    `;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;

    res.status(200).send(generatedResponse.text());
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/suggestDesc", async (req, res) => {
  const { heading, desc, price, brand, warranty, offline, shipment } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Consider the following data of a product:
    heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}

    Identify limitations in this product and suggest improvements that can be made in product Description by considering if there is irrelevant information about the attribute and incomplete information. Compare changes with similar products existing in the market, remember I need this suggestion should be smart and of 1 line.
    `;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;

    res.status(200).send(generatedResponse.text());
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/suggestPrice", async (req, res) => {
  const { heading, desc, price, brand, warranty, offline, shipment } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Consider the following data of a product:
    heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}
    Identify limitations in this product and suggest improvements that can be made in product pricing by considering if there is irrelevant information about the attribute and incomplete information. Compare changes with similar products existing in the market, remember I need this suggestion should be smart and of 1 line.
    `;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;

    res.status(200).send(generatedResponse.text());
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/suggestWarranty", async (req, res) => {
  const { heading, desc, price, brand, warranty, offline, shipment } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Consider the following data of a product:
    heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}

    Identify limitations in this product and suggest improvements that can be made in product warranty by considering if there is irrelevant information about the attribute and incomplete information. Compare changes with similar products existing in the market, remember I need this suggestion should be smart and of 1 line.
    `;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;

    res.status(200).send(generatedResponse.text());
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/suggestOffline", async (req, res) => {
  const { heading, desc, price, brand, warranty, offline, shipment } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Consider the following data of a product:
    heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}

    Identify limitations in this product and suggest improvements that can be made in offline assistance of the product by considering if there is irrelevant information about the attribute and incomplete information. Compare changes with similar products existing in the market, remember I need this suggestion should be smart and of 1 line.
    `;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;

    res.status(200).send(generatedResponse.text());
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/suggestShipment", async (req, res) => {
  const { heading, desc, price, brand, warranty, offline, shipment } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Consider the following data of a product:
    heading: ${heading}, description: ${desc}, price: ${price}, brand: ${brand}, warranty information: ${warranty}, offline assistance: ${offline}, shipment details: ${shipment}

    Identify limitations in this product and suggest improvements that can be made in product shipment by considering if there is irrelevant information about the attribute and incomplete information. Compare changes with similar products existing in the market, remember I need this suggestion should be smart and of 1 line.
    `;

    const result = await model.generateContent(prompt);
    const generatedResponse = await result.response;

    res.status(200).send(generatedResponse.text());
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
