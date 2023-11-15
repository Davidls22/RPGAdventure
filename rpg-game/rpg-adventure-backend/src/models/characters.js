// src/models/character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    race: { type: String, required: true },
    gender: { type: String, required: true },
    level: { type: Number, default: 1 },
    // Add more fields soon
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
