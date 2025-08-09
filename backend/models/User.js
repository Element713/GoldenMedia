// User.js
// TODO: Define User schema for MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  birthday: Date,
  avatarUrl: String,
  bio: String,
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
