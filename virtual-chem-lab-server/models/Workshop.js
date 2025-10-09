const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
  status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
  price: { type: Number, default: 0 }
});

module.exports = mongoose.model('Workshop', WorkshopSchema);
