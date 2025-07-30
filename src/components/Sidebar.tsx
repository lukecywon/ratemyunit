import React, {useState} from 'react';
import '../styles/sidebar.css';
import SmallSearchBar from "./SmallSearchBar.tsx";

const FilterCard: React.FC = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const toggleMenu = (menuName: string) => {
        setOpenMenu(prev => (prev === menuName ? null:menuName));
    };

    const handleSearch = (query: string) => {
        console.log('Searching for units or reviews:', query);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-6">
            <h1 className="text-xl font-bold mb-4">Filters</h1>

            <h1 className="text-l font-bold mb-4">Search</h1>
            <div className="dropdown mb-4">
                <SmallSearchBar className= "rounded-lg h-10 sm:h-12 text-md sm:text-lg" onSearch={handleSearch} placeholder="Search units or reviews..."/>
            </div>

            <div className="dropdown mb-4">
                <button onClick = {() => toggleMenu('faculty')} className="w-full text-left font-medium text-gray-700">
                    Faculty
                </button>
                {openMenu === 'faculty' && (
                    <div className="pl-4 mt-2 space-y-1 text-sm text-blue-600">
                        <a href="/">School Of IT</a>
                        <a href="/">School Of Engineering</a>
                        <a href="/">School Of Business</a>
                    </div>
                )};
            </div>

            <div className="dropdown mb-4">
                <button onClick = {() => toggleMenu('level')} className="w-full text-left font-medium text-gray-700">
                    Level
                </button>
                {openMenu === 'level' && (
                    <div className="pl-4 mt-2 space-y-1 text-sm text-blue-600">
                        <a href="/">1</a>
                        <a href="/">2</a>
                        <a href="/">3</a>
                    </div>
                )};
            </div>
        </div>
    )
}

export default FilterCard;