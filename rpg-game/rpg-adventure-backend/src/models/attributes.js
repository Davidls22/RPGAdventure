// src/models/attributes.js
const mongoose = require('mongoose');

const attributesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    strength: { type: Number, default: 1 },
    agility: { type: Number, default: 1 },
    // Add more fields soon
});

const Attributes = mongoose.model('Attributes', attributesSchema);

module.exports = Attributes;
