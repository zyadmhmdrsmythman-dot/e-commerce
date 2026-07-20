import React, { useEffect, useState, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false); 

    const navigate = useNavigate();
    const searchRef = useRef(null); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = searchTerm.trim();

        if (trimmedQuery) {
            navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
            setSearchTerm("");
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            const trimmedQuery = searchTerm.trim();
            if (!trimmedQuery) {
                setSuggestions([]);
                setIsOpen(false);
                return;
            }

            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedQuery)}`);
                const data = await res.json();
                setSuggestions(data.products?.slice(0, 5) || []);
                setIsOpen(true);
            } catch (error) {
                console.error("Search Error : ", error);
                setSuggestions([]);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectSuggestion = (id) => {
        navigate(`/products/${id}`); 
        setSearchTerm("");
        setSuggestions([]);
        setIsOpen(false);
    };

    return (
        <div className="searchBox_Container" ref={searchRef}>
            <form onSubmit={handleSubmit} className="search_box">
                <input 
                    type="text" 
                    placeholder="Search for products..." 
                    name="search" 
                    id="search"
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                    autoComplete="off"
                />

                <button type="submit" className="search_btn" aria-label="Search">
                    <FaSearch />
                </button>
            </form>

            {isOpen && suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((item) => (
                        <li key={item.id} onClick={() => handleSelectSuggestion(item.id)}>
                            {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="suggestion-img" />}
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBox;