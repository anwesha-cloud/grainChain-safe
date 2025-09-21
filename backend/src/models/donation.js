const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  food_type: { type: String, required: true },
  quantity: { type: Number, required: true },
  donor: { type: String, default: 'mock-user' },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  upload_time: { type: Date, default: Date.now },
  expiry_hours: { type: Number },
  safe_till: { type: Date }
}, { timestamps: true });

donationSchema.index({ location: '2dsphere' });

donationSchema.pre('save', function (next) {
  if (this.expiry_hours && !this.safe_till) {
    const base = this.upload_time ? this.upload_time.getTime() : Date.now();
    this.safe_till = new Date(base + this.expiry_hours * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
