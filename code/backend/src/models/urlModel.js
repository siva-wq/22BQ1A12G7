const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  clicks: { type: Number, default: 0 },
  clickDetails: [{ timestamp: Date, source: String, location: String }]
});

module.exports = mongoose.model('Url', urlSchema);