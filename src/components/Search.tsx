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
        <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative w-full">
                <input
                    placeholder={ placeholder }
                    className="input shadow-lg focus:border-2 border-gray-300 px-4 py-3 rounded-xl w-full transition-all focus:w-full outline-none
                    h-16 max-w-full sm:h-18 sm:max-w-full text-xl sm:text-2xl bg-white/70 hover:bg-white focus:bg-white text-gray-500 font-mono"
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

/*

<button type="submit"
                    className="w-[100px] h-[50px] ml-2 bg-gray-100 text-black px-3 py-1 rounded hover:bg-white">
                Search
            </button>
            <div className="relative text-gray-600">
                <input type="search" name="search" placeholder="Search"
                       className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"/>
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                         version="1.1" id="Capa_1" x="0px" y="0px"
                         viewBox="0 0 56.966 56.966"
                         width="512px" height="512px">
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                    </svg>
                </button>
            </div>
 */

export default SearchBar;