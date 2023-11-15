const express = require('express');
const User = require('../models/users');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        console.log('Full request body:', req.body);

        const { username, password } = req.body;
        console.log('Received request:', { username, password });

        const newUser = new User({
            username,
            password,
        });

        // Wait for the save operation to complete
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare plain text passwords directly
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
