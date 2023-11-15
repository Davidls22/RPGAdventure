// src/routes/quest.js
const express = require('express');
const Quest = require('../models/quest');

const router = express.Router();

// Create a new quest
router.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        const quest = new Quest({
            title,
            description,
        });
        await quest.save();
        res.status(201).json({ message: 'Quest created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
