// src/routes/character.js
const express = require('express');
const Character = require('../models/characters');

const router = express.Router();

// Create a new character
router.post('/create', async (req, res) => {
    try {
        const { name, race, gender } = req.body;
        const character = new Character({
            name,
            race,
            gender,
        });
        await character.save();
        res.status(201).json({ message: 'Character created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get all characters
router.get('/get', async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
