"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Divider, CardFooter } from "@nextui-org/react";
import { UserCircleIcon } from '@heroicons/react/16/solid';


// interface User {
//     id: number;
//     name: string | null;
//     email: string | null;
//     password: string | null;
//     image: string | null;
//     createdAt: Date;
//     updatedAt: Date;
//     birthDate: Date | null;
//     gender: string | null;
//   }

export default function PersonalInfo() {
    // const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [age, setAge] = useState(0);
    const [dob, setDob] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const saveChanges = () => {
        setIsEditing(false);
        console.log('Saving changes:', { name, email, dob });
       
        
        
    };

    // async function fetchCurrentUser() {
    //     try {
    //         const response = await fetch('/api/user');
    //         console.log('Status:', response.status);  // Log the status code
    //     const text = await response.text();  // Get the response text
    //     console.log('Response:', text); 
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch the user');
    //         }
    //         const userData: User = await response.json();
    //         console.log(userData);
    //         setUser(userData);
    //         setName(userData.name || '');
    //         setEmail(userData.email || '');
    //         setAge(25);
    //         // setDob(userData.birthDate || '01/01/1996');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchCurrentUser();
    // }, []);

    return (
        <div>
            <Card className="w-[400px] border-4 rounded-xl">
                <CardHeader className="bg-teal-500 gap-3 rounded-l">
                    <UserCircleIcon className='w-16 h-16' />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Personal Information</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    {
                        isEditing ? (
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    className="w-full p-2 my-2 border-2 rounded text-black" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                /> 
                                
                                {/* <input 
                                type="text" 
                                placeholder="Age" 
                                className="w-full p-2 my-2 border-2 rounded text-black" 
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                            /> */}

                                <input 
                                    type="text" 
                                    placeholder="Date of Birth"  
                                    className="w-full p-2 my-2 border-2 rounded text-black" 
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)} 
                                />  
                                <input 
                                    type="text" 
                                    name="email" 
                                    className="w-full p-2 my-2 border-2 rounded text-black" 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                        ) : (
                            <div>
                                <p>Name: {name || ""} </p>
                                {/* <p>Age: {" "}</p> */}
                                <p>Date of Birth:{dob || ""}</p>
                                <p>Email: {email || ''}</p>
                               
                            </div>
                        )
                    }
                </CardBody>
                <Divider />
                <CardFooter>
                    {isEditing ? (
                        <button onClick={saveChanges} className="w-20 px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white cursor-pointer font-semibold">Save</button>
                    ) : (
                        <button onClick={handleEdit} className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">Edit</button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
