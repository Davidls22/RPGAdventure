import React, { useState } from 'react';

const Character = ({ onCreateCharacter }) => {
    const [characterName, setCharacterName] = useState('');
    const [characterRace, setCharacterRace] = useState('');
    const [characterGender, setCharacterGender] = useState('');

    const handleCharacterCreation = () => {
        onCreateCharacter({
            name: characterName,
            race: characterRace,
            gender: characterGender,
        });
    };

    return (
        <div>
            <label>Character Name:</label>
            <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
            />
            <label>Race:</label>
            <select value={characterRace} onChange={(e) => setCharacterRace(e.target.value)}>
                {/* Options for races */}
            </select>
            <label>Gender:</label>
            <select value={characterGender} onChange={(e) => setCharacterGender(e.target.value)}>
                {/* Options for genders */}
            </select>
            <button onClick={handleCharacterCreation}>Create Character</button>
        </div>
    );
};

export default Character;
