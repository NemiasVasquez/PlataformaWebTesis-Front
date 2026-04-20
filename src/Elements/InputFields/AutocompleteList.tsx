import React from 'react';

interface AutocompleteListProps {
    suggestions: any[];
    itemFiltrado: string;
    onSelect: (item: any) => void;
}

export const AutocompleteList: React.FC<AutocompleteListProps> = ({ suggestions, itemFiltrado, onSelect }) => (
    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-40 overflow-y-auto text-sm">
        {suggestions.map((item, i) => (
            <li
                key={i} onMouseDown={() => onSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
                {item[itemFiltrado]}
            </li>
        ))}
    </ul>
);
