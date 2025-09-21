// Node.js example using axios
const axios = require('axios');
async function callAiAndSave(foodObj, db) {
  // foodObj = { food_type, upload_time, storage, temperature, lat, lng, donorId }
  const payload = {
    food_type: foodObj.food_type,
    upload_time: foodObj.upload_time,
    storage: foodObj.storage,
    temperature: foodObj.temperature,
    lat: foodObj.lat,
    lng: foodObj.lng
  };
  const res = await axios.post('http://127.0.0.1:5001/predict', payload, { timeout: 5000 });
  const aiResult = res.data; // JSON response from Flask
  // Save to Mongo (example using Mongoose)
  const Food = require('./models/Food'); // your Mongoose model
  const doc = new Food({
     food_type: aiResult.food_type,
     upload_time: new Date(foodObj.upload_time),
     expiry_time: new Date(aiResult.safe_till_iso),
     donor_id: foodObj.donorId,
     status: 'available',
     storage: aiResult.storage,
     temperature: aiResult.temperature,
     lat: aiResult.lat,
     lng: aiResult.lng,
     ai_source: aiResult.source
  });
  await doc.save();
  return doc;
}
