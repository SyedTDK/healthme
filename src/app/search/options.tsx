import { useState } from "react";
import Select from 'react-select';  // for customized select input

export interface OptionType {
    value: string;
    label: string;
}
interface Props {
    selectedOption: OptionType | null;
    onChange: (selectedOption: OptionType | null) => void;
}

// Select element
export default function SelectOption({ selectedOption, onChange }: Props) {
    return (
        <div className='bg-gray-700 text-white h-10 mb-2 md:w-56 md:mb-0 '>
            <Select
                value={selectedOption}
                onChange={onChange}
                options={options} // sets the opions
                placeholder="Select an option"
                isSearchable={true}
                styles={customStyles} // Apply custom styles
                
                maxMenuHeight={200} // Limit the maximum height of the menu to enable scrolling
            />
            {/* <p>Selected option: {selectedOption ? selectedOption.label : ""}</p> */}
        </div>
    );
}


// Values to show in the select element, add more values if needed
export const options: Array<OptionType> = [
    { value: 'allergist', label: 'Allergist' },
    { value: 'audiologist', label:'Audiologist' },
    // { value: 'anesthesiologist', label: 'Anesthesiologist' },
    { value: 'cardiologists', label: 'Cardiologist' },
    { value: 'dentist', label: 'Dentist'},
    { value: 'dermatologist', label: 'Dermatologist' },
    { value: 'endocrinologist', label: 'Endocrinologist' },
    { value: 'primary care physician', label: 'Primary Care Physician'},
    { value: 'gastroenterologist', label: 'Gastroenterologist' },
    { value: 'hepatologist', label: 'Hepatologist' },
    { value: 'infectious disease specialist', label: 'Infectious Disease Specialist'},
    { value: 'nephrologist', label: 'Nephrologist' },
    { value: 'neurologist', label: 'Neurologist' },
    { value: 'obstetricians and gynecologists', label: 'Obstetricians and Gynecologist' },
    { value: 'oncologist', label: 'Oncologist'},
    { value: 'ophthalmologist', label: 'Ophthalmologist' },
    { value: 'otolaryngologist', label: 'Otolaryngologist' },
    { value: 'pediatrician', label: 'Pediatrician' },
    { value: 'physiatrist', label: 'Physiatrist' },
    { value: 'plastic surgeons', label: 'Plastic Surgeons' },
    { value: 'pulmonologist', label: 'Pulmonologist' },
    { value: 'rheumatologist', label: 'Rheumatologist'},
    { value: 'speech therapist', label: 'Speech Therapist' },
    // { value: 'family practice', label: 'Family Physicians' },
    { value: 'urologist', label: 'Urologist'},
    { value: 'vascular surgeons', label: 'Vascular Surgeons'},
    
    
   
];


// custom styles for the imported select component
export const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: '#4a5568', // Custom background color for the control element (search bar)
        borderColor: state.isFocused ? "#4299e1" : "#cbd5e0",
        // borerColor: state.isFocused ? "#cbd5e0": provided.borderColor,
        borderWidth: "2px",
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px solid white', // Add white bottom border between options
        backgroundColor: state.isFocused ? "#718096" : "#4a5568",
        color: 'white'

    }),
    singleValue: (provided: any, state: any) => ({
        ...provided,
        // color: state.isSelected ? "#718096" : "#ffffff",
        color: state.isFocused ? "black" : " white"

    }),
    input: (provided: any) => ({
        ...provided,
        color: '#ffffff', // Custom text color for the input when typing (white)
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: '#ffffff', // Custom color for the dropdown indicator (white)
    }),
    menu: (provided: any) => ({
        ...provided,
        padding: '0', // Add padding to the menu (option list)
        margin: '0'
    }),
    placeholder: (provided: any, state: any) => ({
        ...provided,
        // color: state.isFocused ? "black" : "white",
        color: "white",
    }),
    noOptionsMessage: (provided: any) => ({
        ...provided,
        backgroundColor: '#4a5568', // Custom background color for the "No options" message
        color: '#ffffff', // Custom text color for the "No options" message
    }),

};