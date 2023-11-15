import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CharacterActions from './components/CharacterActions';


function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <div>
            <h1>RPG Adventure Game</h1>

            {!isLoggedIn ? (
                <>
                    <Login onLogin={handleLogin} />
                    <Register />
                </>
            ) : (
                <div>
                    <CharacterActions />
                </div>
            )}
        </div>
    );
}

export default App;
