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
                    className={ "input border-1 focus:border-2 border-gray-300 px-4 py-3 w-full transition-all focus:w-full outline-none max-w-full sm:max-w-full " +
                        "bg-white/70 hover:bg-white focus:bg-white text-gray-500 font-mono " + className}
                    name="search"
                    type="search"
                    onChange={ handleChange }
                    value={ query }
                />
            </div>

        </form>
    );
};


export default SmallSearchBar;