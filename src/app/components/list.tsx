"use client"
import { useState } from 'react';

interface Business {
    address: string;
    email: string;
    name: string;
    phone: string;
    specialty: string;
}

interface Props {
    businesses: Business[];
    initial_address: string;
}

// Returns the rendered data fetched from the API
const DoctorList: React.FC<Props> = ({ businesses, initial_address }) => {
    return (
        <div className='md:w-2/3 md:mx-auto mx-4 border-2 border-gray-300 overflow-y-auto lg:h-96' >
            <ul>
                {businesses.map((business, index) => (
                    <li key={index}
                    className=' bg-gray-900 odd:bg-gray-700  text-center p-2'>
                        <h2 className='text-xl'>{business.name}</h2>
                        <p className='text-base'>Address:
                            {/* Opens Googel maps for directions */}
                            <a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(initial_address)}&destination=${encodeURIComponent(business.address)}&travelmode=driving`}
                            target="_blank" className='hover:text-blue-500 underline'>{business.address} </a>
                        </p>
                        <p className='text-base'>Phone:
                            <a href="tel:{business.phone}" className=' underline hover:text-blue-500'>{ business.phone}</a>
                        </p>
                        <p>Specality: { business.specialty}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
