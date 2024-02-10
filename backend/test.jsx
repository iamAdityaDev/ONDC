import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css';

const api = 'AIzaSyDT__9TFdPA53ZAzP_l30ScEiEl-Caz_yM';
const genAI = new GoogleGenerativeAI(api);

function App() {
  const [result_prompt, setresult_prompt] = useState([]);
  const [result_prompt2, setresult_prompt2] = useState([]);
  const [result_prompt3, setresult_prompt3] = useState([]);
  const [productInfo, setProductInfo] = useState({
    product_name: '',
    description: '',
    brand: '',
    price: '',
    availability: false,
    warranty_info: '',
    offline_assistance: '',
    shipment_details: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const fetchData = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt3=`Simply give me the category of this product ${JSON.stringify(productInfo)}.
       It should be in this fashion--> Clothes (T-shirt), Electronics   (Smart Phone)`
      const result3 = await model.generateContent(prompt3);
      const generatedResponse3 = await result3.response;
      const generatedText3 = generatedResponse3.text();
      setresult_prompt3(generatedText3);
      console.log(generatedText3)

      const prompt=`Provide an overall score for the product on a scale of 1 to 10. 
      The score should incorporate various attributes provided in the product information ${JSON.stringify(productInfo)}, 
      ensuring accuracy to differentiate and rank similar products. Consider the following constraints while generating the score:
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
       No need to print anything other than this Score should be of the format--> 2.1, 4 like this..`
      const result = await model.generateContent(prompt);
      const generatedResponse = await result.response;
      const generatedText = generatedResponse.text();
      setresult_prompt(generatedText);
      console.log(generatedText)

      const prompt2=`List out the limitations in the product ${JSON.stringify(productInfo)} and suggest changes that can be done to make the product more economical,
       convinient for the customer while considering these factors. 
      1) Compare and suggest changes according to similar existing product.
      2) Exclude irrelevant attributes for specific products. For instance, clothing products do not require warranty information.
      3) Ensure the price is practical. For example, a bottle priced at 10,000 rupees would not be considered economical.
      4) Product description should be comprehensive and informative.
      5) Products requiring warranty should have precise warranty information. For instance, electronics should specify whether the warranty covers software and hardware.
      6) Consider offline assistance as a key factor, particularly targeting customers who prefer traditional offline support over online services.
      7) Availibilty...
      suggestion should be to the point and short enough to convey the possible limitations`
      const result2 = await model.generateContent(prompt2);
      const generatedResponse2 = await result2.response;
      const generatedText2 = generatedResponse2.text();
      setresult_prompt2(generatedText2);
      console.log(generatedText2)
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Product Information:', productInfo);
    fetchData();
    setSubmitted(true);
  };

  // const handleBack = () => {
  //   setSubmitted(false);
  // };

  return (
    <>
    <div className="container">
      
        <form onSubmit={handleSubmit}>
          <div className="row_form">
          <label>
            Product Name:
            <input required
              type="text"
              name="product_name"
              value={productInfo.product_name}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Description:
            <textarea
              name="description"
              value={productInfo.description}
              onChange={handleChange}
              style={{ resize: 'vertical' }}
            />
          </label>
          <br />

          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={productInfo.brand}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Price:
            <input required
              type="text"
              name="price"
              value={productInfo.price}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Availability:
            <input
              className="box"
              type="checkbox"
              name="availability"
              checked={productInfo.availability}
              onChange={handleChange}
            />
          </label>
        </div>
          <br />
          <div className="row_form">
          <label>
            Warranty Info:
            <input
              type="text"
              name="warranty_info"
              value={productInfo.warranty_info}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Offline Assistance:
            <input
              type="text"
              name="offline_assistance"
              value={productInfo.offline_assistance}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Shipment Details:
            <input
              type="text"
              name="shipment_details"
              value={productInfo.shipment_details}
              onChange={handleChange}
            />
          </label>
          <br />

          <button className='register' type="submit">Register</button>
        </div>
        </form>
      {submitted && (
        <div className='after_hit'>
          <div className="score_row">
            <h3 className='bottom'>Product Category</h3>
            <p>{result_prompt3}</p>
          </div>
          <div className="score_row">
            <h3 className='bottom'>Overall Score:</h3>
            <p>{result_prompt} out of 10</p>
          </div>
          <div className="score_row">
            <h3 className='bottom'>Suggestions:</h3>
            <p>{result_prompt2}</p>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default App;