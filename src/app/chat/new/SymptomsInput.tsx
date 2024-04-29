import React, { useState, useEffect } from 'react';

interface SymptomsInputProps {
    symptoms: string[];
    onSymptomSelect: (symptom: string) => void;
}

const SymptomsInput: React.FC<SymptomsInputProps> = ({ symptoms, onSymptomSelect }) => {
    const [filter, setFilter] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isMouseInside, setIsMouseInside] = useState<boolean>(false);  // New state for mouse hover

    const filteredSymptoms = symptoms.filter(symptom =>
        symptom.toLowerCase().includes(filter.toLowerCase())
    );

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Filter changing to:", e.target.value); 
        setFilter(e.target.value);
        if (e.target.value) {
            setShowDropdown(true);
            console.log("Dropdown set to show"); 
        }
    };

    const handleSymptomClick = (symptom: string) => {
        console.log("Symptom clicked:", symptom);
        onSymptomSelect(symptom);
        setFilter('');
        setShowDropdown(false);
        console.log("Dropdown set to hide after selection");
    };

    useEffect(() => {
        console.log("Focus state:", isFocused, "Mouse inside:", isMouseInside, "Filtered Symptoms Length:", filteredSymptoms.length);
        if ((isFocused || isMouseInside) && filteredSymptoms.length > 0) {
            setShowDropdown(true);
            console.log("Dropdown should be visible");
        } else {
            setShowDropdown(false);
            console.log("Dropdown should be hidden");
        }
    }, [isFocused, isMouseInside, filteredSymptoms.length]);

    return (
        <div className="symptom-input-container relative w-full md:w-3/4 lg:w-1/2">
            <input
                type="text"
                className="symptom-input bg-gray-800 text-white rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full"
                placeholder="Start typing a symptom..."
                value={filter}
                onChange={handleFilterChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 300)}
            />
            {showDropdown && (
                <div className="symptom-dropdown absolute z-10 w-full bg-gray-800 bottom-full rounded-lg shadow-lg max-h-60 overflow-auto"
                     onMouseEnter={() => setIsMouseInside(true)}
                     onMouseLeave={() => setIsMouseInside(false)}>
                    {filteredSymptoms.map((symptom, index) => (
                        <div
                            key={index}
                            className="dropdown-item text-white text-sm p-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleSymptomClick(symptom)}
                        >
                            {symptom}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SymptomsInput;
