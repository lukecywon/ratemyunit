import React, {useState} from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder = 'Search units or reviews...', onSearch}) => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar flex items-center">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-[400px] h-[70px] border rounded-2xl px-3 py-2 bg-white"
            />
            <button type="submit" className="w-[100px] h-[50px] ml-2 bg-gray-100 text-black px-3 py-1 rounded hover:bg-white">
                Search
            </button>
        </form>
    );
};

export default SearchBar;