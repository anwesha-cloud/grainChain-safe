const axios = require('axios');

const ML_ENDPOINT = process.env.ML_ENDPOINT || 'http://localhost:6000/predict';

async function predictExpiry(food_type, upload_time, storage = 'room', temperature = null) {
  try {
    const payload = { food_type, upload_time, storage, temperature };
    const resp = await axios.post(ML_ENDPOINT, payload, { timeout: 4000 });
    return resp.data;
  } catch (err) {
    console.error('ML call failed:', err.message);
    // fallback values if AI is down
    return { adjusted_expiry: 4, safe_till_iso: null };
  }
}

module.exports = { predictExpiry };
