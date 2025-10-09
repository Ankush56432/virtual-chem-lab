const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorkshopRegistration', RegistrationSchema);
