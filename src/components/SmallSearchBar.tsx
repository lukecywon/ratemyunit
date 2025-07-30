import React, {useState} from 'react';

interface SmallSearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    className?: string;
}

const SmallSearchBar: React.FC<SmallSearchBarProps> = ({placeholder = 'Search units or reviews...', onSearch, className}) => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form onSubmit={ handleSubmit } className="flex items-center">
            <div className="relative w-full">
                <input
                    placeholder={ placeholder }
                    className={ "input shadow-lg border-1 focus:border-2 border-gray-300 px-4 py-3 w-full transition-all focus:w-full outline-none max-w-full sm:max-w-full " +
                        "bg-white/70 hover:bg-white focus:bg-white text-gray-500 font-mono " + className}
                    name="search"
                    type="search"
                    onChange={ handleChange }
                    value={ query }
                />
                <button type="submit" className="absolute top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700">
                    <svg
                        className="w-6 h-6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
            </div>

        </form>
    );
};


export default SmallSearchBar;