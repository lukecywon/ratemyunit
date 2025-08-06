import React from 'react';
import '../styles/sidebar.css';
import SideBarSearch from "./SidebarSearch.tsx";
import CustomDropdown from "./Dropdown.tsx";



const FilterCard: React.FC = () => {
    const faculties = [
        {name: "All faculties"},
        {name: "School of IT"},
        {name: "School of Engineering"},
        {name: "School of Buisiness"},
        {name: "School of Medical Health and Science"},
        {name: "School of Science"}
    ]

    const level = [
        {name: "All levels"},
        {name: "1"},
        {name: "2"},
    ]

    const handleSearch = (query: string) => {
        console.log('Searching for units or reviews:', query);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-3">
            <h1 className="text-xl font-bold mb-4">Filters</h1>

            <h1 className="text-l font-bold mb-4">Search</h1>
            <div className="dropdown mb-4">
                <SideBarSearch className= "rounded-lg h-10 sm:h-12 sm:w-max text-md sm:text-lg" onSearch={handleSearch} placeholder="Search units or reviews..."/>
            </div>

            <div>
                <h1>Faculty</h1>
                <CustomDropdown options={faculties} placeholder="All faculties" />

                <h1>Level</h1>
                <CustomDropdown options={level} placeholder="All levels" />
            </div>
        </div>
    )
}

export default FilterCard;
