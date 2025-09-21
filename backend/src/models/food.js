const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: { type: String }, // short human label
  food_type: { type: String, required: true }, // e.g. rice, biryani
  description: { type: String },
  quantity: { type: Number, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] } // [lng, lat]
  },
  upload_time: { type: Date, default: Date.now },
  expiry_hours: { type: Number },
  safe_till: { type: Date },
  status: { type: String, enum: ['pending','claimed','expired'], default: 'pending' },
  ai_meta: { // optional: store ML result metadata
    source: String,
    confidence: Number
  }
}, { timestamps: true });

foodSchema.index({ location: '2dsphere' });

// auto-compute safe_till if expiry_hours provided and safe_till not set
foodSchema.pre('save', function(next) {
  if (this.expiry_hours && !this.safe_till) {
    const base = this.upload_time ? this.upload_time.getTime() : Date.now();
    this.safe_till = new Date(base + this.expiry_hours * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('Food', foodSchema);