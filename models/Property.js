const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: String,
  location: String,
  rent: Number,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isAvailable: { type: Boolean, default: true },
  images: [String]
});

module.exports = mongoose.model('Property', PropertySchema);
