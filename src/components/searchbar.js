import { useState } from 'react';

function SearchBar({ onResults, onSearchStart }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        onSearchStart();
        setError(null);

        try {
            const response = await fetch(
                `https://loose-bananas-guess.loca.lt/search?username=${encodeURIComponent(username)}`
            );
            
            const data = await response.json();
            
            if (!response.ok || data.error) {
                throw new Error(data.error || 'Search failed');
            }

            onResults(data);
        } catch (err) {
            setError(err.message);
            onResults(null);
        }
    };

    return (
        <form className="search-form" onSubmit={handleSearch}>
            <input
                type="text"
                className="search-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default SearchBar;