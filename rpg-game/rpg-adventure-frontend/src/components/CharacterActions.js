import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterActions.css';

const CharacterActions = () => {
    const [characterName, setCharacterName] = useState('');
    const [characterRace, setCharacterRace] = useState('');
    const [characterGender, setCharacterGender] = useState('');
    const [createdCharacter, setCreatedCharacter] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);

    const handleCharacterCreation = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/character/create',
                { name: characterName, race: characterRace, gender: characterGender }
            );

            alert('Character created successfully!');
            setCreatedCharacter(response.data);
            fetchCharacters();
            handleInventoryFetch(response.data._id);

            // Additional logic to add starting items to the character's inventory
            const startingItems = [
                { name: 'Sword', quantity: 1 },
                { name: 'Shield', quantity: 1 },
            ];

            await axios.post('http://localhost:3000/inventory/create', {
                characterId: response.data._id,
                items: startingItems,
            });

        } catch (error) {
            console.error(error);
            alert('Character creation failed!');
        }
    };


    const handleAdventure = async () => {
        try {
            if (!createdCharacter) {
                alert('Character not created yet!');
                return;
            }
    
            const adventureResult = Math.random();
            const updatedCharacter = { ...createdCharacter };
            updatedCharacter.level += adventureResult > 0.5 ? 1 : 0;
    
            const response = await axios.put(
                `http://localhost:3000/character/update/${updatedCharacter._id}`,
                { level: updatedCharacter.level }
            );
    
            alert(`Adventure result: ${adventureResult > 0.5 ? 'Success' : 'Failure'}`);
            setCreatedCharacter(response.data);
            handleInventoryFetch(response.data._id);
        } catch (error) {
            console.error(error);
            alert('Adventure failed!');
        }
    };

    const handleAddItem = async () => {
        try {
            const newItem = { name: newItemName, quantity: newItemQuantity };

            const response = await axios.post(
                `http://localhost:3000/inventory/add/${createdCharacter._id}`,
                { item: newItem }
            );

            alert('Item added to inventory!');
            handleInventoryFetch(createdCharacter._id);
        } catch (error) {
            console.error(error);
            alert('Failed to add item to inventory!');
        }
    };
    

    const fetchCharacters = async () => {
        try {
            const response = await axios.get('http://localhost:3000/character/get');
            setCharacters(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch characters!');
        }
    };

    const handleInventoryFetch = async (characterId) => {
        try {
            const response = await axios.get(`http://localhost:3000/inventory/get/${characterId}`);
            const items = response.data?.items || []; // Add a null check for response.data
            setInventory(items);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch inventory!');
        }
    };
    

    useEffect(() => {
        fetchCharacters();
    }, []);

    return (
        <div>
            <h2>Actions</h2>
            <div>
                <label>Character Name:</label>
                <input
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                />
                <label>Race:</label>
                <select value={characterRace} onChange={(e) => setCharacterRace(e.target.value)}>
                    <option value="">Select Race</option>
                    <option value="Elf">Elf</option>
                    <option value="Dwarf">Dwarf</option>
                    <option value="Ogre">Ogre</option>
                    <option value="Troll">Troll</option>
                    <option value="Witch">Witch</option>
                    <option value="Wizard">Wizard</option>
                    <option value="Vampire">Vampire</option>
                    <option value="Gnome">Gnome</option>
                    <option value="Knight">Knight</option>
                </select>
                <label>Gender:</label>
                <select value={characterGender} onChange={(e) => setCharacterGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="None">None</option>
                </select>
                <button onClick={handleCharacterCreation}>Create Character</button>
            </div>
            <div>
                <h3>All Characters</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Race</th>
                            <th>Gender</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map((char) => (
                            <tr key={char._id}>
                                <td>{char.name}</td>
                                <td>{char.race}</td>
                                <td>{char.gender}</td>
                                <td>{char.level}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
            <div>
                <button onClick={handleAdventure}>Go on an Adventure</button>
            </div>
        </div>
    );
                };    

export default CharacterActions;
