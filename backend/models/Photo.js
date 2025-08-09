// Photo.js
// TODO: Define Photo schema for MongoDB
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  path: String,
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String }]
});

module.exports = mongoose.model('Photo', photoSchema);
