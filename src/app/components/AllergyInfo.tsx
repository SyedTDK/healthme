"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider, CardFooter } from "@nextui-org/react";
import { ExclamationCircleIcon, TrashIcon } from '@heroicons/react/16/solid';

const AllergyInfo: React.FC = () => {
    const [allergies, setAllergies] = useState<string[]>(['Peanut', 'Pollen', 'Dust', 'Penicillin']);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newAllergy, setNewAllergy] = useState<string>('');

    const handleAddAllergy = (): void => {
        if (newAllergy) {
            setAllergies([...allergies, newAllergy]);
            setNewAllergy('');
        }
    };

    const handleDeleteAllergy = (index: number): void => {
        setAllergies(allergies.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Card className="w-[400px] border-4 rounded-xl">
                <CardHeader className="bg-teal-500 gap-3 rounded-l">
                    <ExclamationCircleIcon className='w-16 h-16' />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Allergies</p>
                    </div>
                </CardHeader>
                <Divider className='border-white'/>
                <CardBody>
                    <ol>
                        {allergies.map((allergy, index) => (
                            <li key={index} className="flex justify-between items-center">
                                {allergy}
                                {isEditing && (
                                    <button onClick={() => handleDeleteAllergy(index)} className="text-red-500 hover:text-red-700">
                                        <TrashIcon className='w-5 h-5' />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ol>
                    {isEditing && (
                        <div className="mt-4">
                            <input 
                                type="text"
                                value={newAllergy}
                                onChange={(e) => setNewAllergy(e.target.value)}
                                className="p-2 border-2 rounded text-black"
                                placeholder="Enter new allergy"
                            />
                            <button onClick={handleAddAllergy} className="ml-2 px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white">
                                Add
                            </button>
                        </div>
                    )}
                </CardBody>
                <Divider/>
                <CardFooter>
                    <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">
                        {isEditing ? 'Done' : 'Edit'}
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default AllergyInfo;
