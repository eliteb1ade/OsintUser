import './App.css';
import { useState } from 'react';
import SearchBar from './components/searchbar';
import Results from './components/results';
import Navbar from './components/navbar';

function App() {
    const [results, setResults] = useState(null); // null means no search yet
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchResults = (data) => {
        setResults(data);
        setIsSearching(false);
    };

    return (
        <div>
          <Navbar />
        <div id="bg">
            <h1>Search for usernames over the internet</h1>
            <SearchBar 
                onResults={handleSearchResults} 
                onSearchStart={() => setIsSearching(true)}
            />
            <Results 
                results={results} 
                isSearching={isSearching} 
            />
        </div>
        </div>
    );
}

export default App;