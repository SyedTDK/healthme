"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider, CardFooter } from "@nextui-org/react";
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/16/solid';

const VaccineInfo: React.FC = () => {
    const [vaccines, setVaccines] = useState<string[]>(['Vaccine 1', 'Vaccine 2', 'Vaccine 3']);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newVaccine, setNewVaccine] = useState<string>('');

    const handleAddVaccine = (): void => {
        if (newVaccine) {
            setVaccines([...vaccines, newVaccine]);
            setNewVaccine('');  // Clear the input after adding
        }
    };

    const handleDeleteVaccine = (index: number): void => {
        setVaccines(vaccines.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Card className="w-[400px] border-4 rounded-xl">
                <CardHeader className="bg-teal-500 gap-3 rounded-l">
                    <CheckCircleIcon className='w-16 h-16' />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Vaccinations</p>
                    </div>
                </CardHeader>
                <Divider className='border-white'/>
                <CardBody>
                    {
                        vaccines.map((vaccine, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <p>{vaccine}</p>
                                {isEditing && (
                                    <button onClick={() => handleDeleteVaccine(index)} className="text-red-500 hover:text-red-700">
                                        <TrashIcon className='w-5 h-5' />
                                    </button>
                                )}
                            </div>
                        ))
                    }
                    {isEditing && (
                        <div className="mt-4">
                            <input 
                                type="text"
                                value={newVaccine}
                                onChange={(e) => setNewVaccine(e.target.value)}
                                className="p-2 border-2 rounded text-black"
                                placeholder="Enter new vaccine"
                            />
                            <button onClick={handleAddVaccine} className="ml-2 px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white">
                                Add
                            </button>
                        </div>
                    )}
                </CardBody>
                <Divider/>
                <CardFooter>
                    <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">
                        {isEditing ? 'Done' : 'Add'}
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default VaccineInfo;
