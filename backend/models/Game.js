// Game.js
// TODO: Define Game schema for MongoDB (for lobby, state, etc.)
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  state: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
