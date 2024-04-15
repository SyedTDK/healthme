//address bar
import React, { useState, useEffect } from 'react';
import SelectOption from "./options"

const apiKey = "AIzaSyAzUXn66Kojc3Ap6F7-xU6wHEL6BJAN4bc";

interface SearchBarProps {
    address: string;
    onAddressChange(query: any): any
}


const AddressBar: React.FC<SearchBarProps> = ({ address, onAddressChange }) => {
    let autocomplete: google.maps.places.Autocomplete;

    useEffect(() => {
        // load the Google Maps API script for address autocmpletion
        const loadScript = async () => {
            if (!window.google || !window.google.maps) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                script.async = true;

                script.onload = () => {
                    autocomplete = new google.maps.places.Autocomplete(
                        document.getElementById('autocompleteInput') as HTMLInputElement
                    );
                    autocomplete.addListener('place_changed', onPlaceChanged);
                };

                document.head.appendChild(script);
            } else {
                autocomplete = new google.maps.places.Autocomplete(
                    document.getElementById('autocompleteInput') as HTMLInputElement
                );
                autocomplete.addListener('place_changed', onPlaceChanged);
            }
        };

        loadScript();
        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            if (autocomplete) {
                google.maps.event.clearInstanceListeners(autocomplete);
            }
        };
    }, []);

    // handle address slection
    const onPlaceChanged = () => {
        if (!autocomplete) return;
        const place = autocomplete.getPlace();
        const formattedAddress = place?.formatted_address ?? "";
        onAddressChange(formattedAddress);
    };

    return (
        <>
            <input
                id="autocompleteInput"
                type="text"
                placeholder="Enter address"
                className='bg-gray-700 text-white md:inline block md:w-2/3 w-full md:mb-0 mb-2 h-10 px-3 md:mx-2 lg:mx-4 focus:outline-none 
                    rounded border-2 border-gray-300 focus:border-blue-500 border-solid shadow-md'
                onChange={(e) => onAddressChange(e.target.value)}
            />
        </>
    );
}

export default AddressBar;
