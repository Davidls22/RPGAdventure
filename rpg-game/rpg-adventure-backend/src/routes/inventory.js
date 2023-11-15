const express = require('express');
const router = express.Router();
const { Inventory, InventoryItem } = require('../models/inventory');

router.post('/create', async (req, res) => {
    try {
        const { characterId, items } = req.body;
        const inventory = await Inventory.create({ characterId, items });
        res.json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get/:characterId', async (req, res) => {
    try {
        const { characterId } = req.params;
        const inventory = await Inventory.findOne({ characterId }).populate('items');
        res.json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
