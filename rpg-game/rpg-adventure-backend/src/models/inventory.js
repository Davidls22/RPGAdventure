const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    // Add more fields soon
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

const inventorySchema = new mongoose.Schema({
    characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },
    items: [inventoryItemSchema],
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = { Inventory, InventoryItem };
