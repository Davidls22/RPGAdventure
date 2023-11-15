import React, { useState } from 'react';
import axios from 'axios';

const Inventory = ({ createdCharacter, onInventoryFetch, inventory }) => {
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);

    const handleAddItem = async () => {
        try {
            const newItem = { name: newItemName, quantity: newItemQuantity };

            const response = await axios.post(
                `http://localhost:3000/inventory/add/${createdCharacter._id}`,
                { item: newItem }
            );

            alert('Item added to inventory!');
            onInventoryFetch(createdCharacter._id);
        } catch (error) {
            console.error(error);
            alert('Failed to add item to inventory!');
        }
    };

    return (
        <div>
            <h3>Inventory</h3>
            <ul>
                {inventory.map((item) => (
                    <li key={item._id}>
                        {item.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            <div>
                <label>New Item Name:</label>
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                />
                <label>Quantity:</label>
                <input
                    type="number"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
        </div>
    );
};

export default Inventory;
