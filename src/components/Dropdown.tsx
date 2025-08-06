import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function CustomDropdown({
                                           options,
                                           placeholder = "Select an option"
                                       }: {
    options: { name: string; code?: string }[],
    placeholder?: string
}) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-full flex flex-col py-5">
            <Dropdown
                value={selected}
                onChange={(e) => setSelected(e.value)}
                options={options}
                optionLabel="name"
                placeholder={placeholder}
                className="w-full md:w-64 h-12 py-2.5 px-4 rounded-lg shadow-lg border border-gray-200 transition-colors duration-300 hover:bg-gray-200"
                panelClassName="w-max md:w-64 py-2.5 px-4 bg-white shadow-lg text-sm rounded-md border border-gray-300"
                itemTemplate={(option) => (
                    <div className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">
                        {option.name}
                    </div>
                )}
            />
        </div>
    );
}

