const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Character routes
const characterRoutes = require('./routes/characters');
app.use('/character', characterRoutes);

// Quest routes
const questRoutes = require('./routes/quest');
app.use('/quest', questRoutes);

// Inventory routes
const inventoryRoutes = require('./routes/inventory');
app.use('/inventory', inventoryRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the RPG Adventure Game API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
