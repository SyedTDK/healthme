"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider, CardFooter } from "@nextui-org/react";
import { ClipboardDocumentCheckIcon } from '@heroicons/react/16/solid';

export default function PhysicalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [bmi, setBmi] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    setIsEditing(false);
    console.log('Saving changes:', { age, height, weight, bloodType, bmi });
  };

  return (
    <div>
      <Card className="w-[400px] border-4 rounded-xl">
        <CardHeader className="bg-teal-500 gap-3 rounded-l">
          <ClipboardDocumentCheckIcon className='w-16 h-16' />
          <div className="flex flex-col">
            <p className="text-lg font-bold">Physical Information</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {
            isEditing ? (
              <div>
                <input
                  type="text"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 my-2 border-2 rounded text-black"
                />
                <input
                  type="text"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 my-2 border-2 rounded text-black"
                />
                <input
                  type="text"
                  placeholder="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 my-2 border-2 rounded text-black"
                />
                <input
                  type="text"
                  placeholder="Blood Type"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full p-2 my-2 border-2 rounded text-black"
                />
                <input
                  type="text"
                  placeholder="BMI"
                  value={bmi}
                  onChange={(e) => setBmi(e.target.value)}
                  className="w-full p-2 my-2 border-2 rounded text-black"
                />
              </div>
            ) : (
              <div>
                <p>Age: {age || ''}</p>
                <p>Height: {height || ''}</p>
                <p>Weight: {weight || ''}</p>
                <p>Blood Type: {bloodType || ''}</p>
                <p>BMI: {bmi || ''}</p>
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
