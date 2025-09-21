const express = require('express');
const Donation = require('../models/donation');
const { predictExpiry } = require('../services/mlService');  // <-- AI service
const router = express.Router();

function toGeoPoint(loc) {
  if (!loc) return undefined;
  if ('lat' in loc && 'lng' in loc) {
    return { type: 'Point', coordinates: [loc.lng, loc.lat] };
  }
  return undefined;
}

// POST /api/donations
router.post('/', async (req, res) => {
  try {
    const { food_type, quantity, donor, location, storage, temperature } = req.body;
    if (!food_type || !quantity) {
      return res.status(400).json({ error: 'food_type and quantity required' });
    }

    const upload_time = new Date().toISOString();

    // Call AI service
    const mlResult = await predictExpiry(food_type, upload_time, storage, temperature);

    const donation = new Donation({
      food_type,
      quantity,
      donor: donor || 'mock-user',
      location: toGeoPoint(location),
      expiry_hours: mlResult.adjusted_expiry,
      safe_till: mlResult.safe_till_iso,
      upload_time
    });

    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    console.error('POST /donations error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// GET /api/donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ upload_time: -1 }).limit(100);
    res.json(donations);
  } catch (err) {
    console.error('GET /donations error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

module.exports = router;
