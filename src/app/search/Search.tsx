"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import SelectOption, { OptionType } from "./options";
import AddressBar from './address-bar';
import DoctorList from './list';
import { CircularProgress } from '@mui/material'; // For loading circle

import axios from 'axios';

// Initial value for the slecet elemtn


export default function Search({specialistValue, specialistLabel}: {specialistValue: string, specialistLabel: string}) {
    const defaultValue: OptionType = {
        value: specialistValue,
        label: specialistLabel,
    };
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(defaultValue);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false); 
    const [businesses, setBusinesses] = useState([]);  

    const handleOptionChange = (selectedOption: OptionType | null) => {
        setSelectedOption(selectedOption);
    };

    const handleAddressChange = (newAddress: string) => {
        setAddress(newAddress);
    };

    // Called when the form is submitted
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true); // Set loading state to true when submitting form

        // format of the API call
        const apiUrl = 'https://yelpapi-production.up.railway.app/search';
        const requestData = {
            limit: 8,
            doctor_type: selectedOption?.value,
            location: address,
        };

        try {
            const response = await axios.post(apiUrl, requestData);
            setBusinesses(response.data.businesses);
            console.log(response.data.businesses)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Set loading state to false when API request completes
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='md:flex mx-auto sm:w-4/6 w-11/12 mb-5'>
                <SelectOption selectedOption={selectedOption} onChange={handleOptionChange} />
                <AddressBar address={address} onAddressChange={handleAddressChange} />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4  md:inline block mx-auto rounded-lg">Search</button>
            </form>

            {/* <p>{address}</p>
            <p>Selected option: {selectedOption ? selectedOption.label : ""}</p> */}

            {/* Show loding cirlce untill data is dispalyed */}
            {loading ? ( 
                <div className="flex justify-center mt-4">
                    <CircularProgress color="primary" /> 
                </div>
            ) : (
                businesses.length > 0 && (
                    <DoctorList businesses={businesses} initial_address={address} />
                )
            )}
        </>
    );
}


