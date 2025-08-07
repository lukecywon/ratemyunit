import React, {useState} from 'react';

interface SidebarSearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    className?: string;
}

const SidebarSearchBar: React.FC<SidebarSearchBarProps> = ({placeholder = 'Search units or reviews...', onSearch, className}) => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form onSubmit={ handleSubmit } className="flex items-center w-full">
            <div className="relative w-full">
                <input
                    placeholder={ placeholder }
                    style={{ fontSize: "1rem" }}
                    className={"w-full border-1 focus:border-2 border-gray-300 px-4 py-3 transition-all outline-none max-w-full sm:max-w-full " +
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


export default SidebarSearchBar;