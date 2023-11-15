// src/models/quest.js
const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Add more fields soon
});

const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;
