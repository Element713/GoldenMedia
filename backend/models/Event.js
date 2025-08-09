// Event.js
// TODO: Define Event (Calendar) schema for MongoDB
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  type: { type: String, enum: ['event', 'birthday', 'anniversary', 'trip'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Event', eventSchema);
