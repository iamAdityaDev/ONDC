import { GoogleGenerativeAI } from '@google/generative-ai';

const api = 'AIzaSyC0aRuYnxBm-wNn5PGsjO2O_M9IFz87GA8';
const genAI = new GoogleGenerativeAI(api);

async function translateProducts(language, productData) {
  try {
    const prompt = "Translate the following product details into ${language}: Heading: ${productData.heading} Description: ${productData.desc} Price: ${productData.price}. Maintain the original product title case and ensure the translated description is concise and clear. The translated output should include a translated heading, description, and price, matching the original structure and format.";

    const result = await genAI.generateContent(prompt);
    const response = await result.response;
    const translatedDetails = response.text();

    const { translatedHeading, translatedDesc, translatedPrice } = extractTranslatedData(translatedDetails);

    return {
      ...productData,
      heading: translatedHeading,
      desc: translatedDesc,
      price: translatedPrice,
    };
  } catch (error) {
    console.error('Error translating product:', error);
    return null;
  }
}

function extractTranslatedData(translatedText) {
  const headingMatch = translatedText.match(/^Heading: (.*)$/m);
  const translatedHeading = headingMatch ? headingMatch[1].trim() : '';

  const descMatch = translatedText.match(/^Description: (.*)$/m);
  const translatedDesc = descMatch ? descMatch[1].trim() : '';

  const priceMatch = translatedText.match(/^Price: (.*)$/m);
  const translatedPrice = priceMatch ? priceMatch[1].trim() : '';

  return { translatedHeading, translatedDesc, translatedPrice };
}

export { translateProducts };