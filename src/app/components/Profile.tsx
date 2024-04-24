//This is profile componenent that takes in the user object and displays the user's name and email. It also has a dropdown menu that allows the user to navigate to the dashboard or sign out.
//This is used in header components to display the user's profile information.
"use client";
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react';


const Profile = ({ user }: { user: any }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    return (
            <nav className="px-4 lg:px-6 py-2.5">
              <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                  <Link href="/" className="flex items-center">
                      <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HealthMe</span>
                  </Link>
                  <div className="flex items-center">
                    <div className="relative">
                        <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" type='button' onClick={() => setDropdownVisible(!dropdownVisible)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>

                        <div id="dropdownInformation" className={`z-10 divide-y rounded-lg shadow w-44 bg-gray-800 divide-gray-600 absolute mt-2 right-0 ${dropdownVisible ? '' : 'hidden'}`}>
                            <div className="px-4 py-3 text-sm text-white">
                            <div>{user?.name}</div>
                            <div className="font-medium truncate">{user?.email}</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownInformationButton">
                            <li>
                                <Link href="/" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Dashboard</Link>
                            </li>
                            </ul>
                            <div className="py-2 hover:bg-gray-600">
                                <button onClick={() => signOut()} className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Sign out</button>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
            </nav>
        
    )
}

export default Profile;