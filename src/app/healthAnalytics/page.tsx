"use client"

import React, { useState } from 'react';

interface Medication {
  name: string;
  instructions: string;
}

const HealthAnalytics: React.FC = () => {
  // Example data (replace with actual data retrieval logic)
  const userName = "Mohammed"; // Replace with actual user name data
  const latestVitals = {
    height: '300 cm', // Example data
    temperature: '30 °C', // Example data
    bloodSugar: '2 mmol/L', // Example data
  };
  
  const medications: Medication[] = [
    { name: 'Medication A', instructions: 'Take 1 tablet daily with water' },
    { name: 'Medication B', instructions: 'Take 2 tablets after meals' },
    { name: 'Medication C', instructions: 'Take as needed for pain relief' },
  ];

  const allergies = ['Pollen', 'Dust', 'Peanuts']; // Add actual allergy data
  const reminders = ['Take vitamins', 'Drink water', 'Go for a walk']; // Add actual reminder data

  // State to manage expansion of each section
  const [medicationsExpanded, setMedicationsExpanded] = useState(false);
  const [heightExpanded, setHeightExpanded] = useState(false);
  const [temperatureExpanded, setTemperatureExpanded] = useState(false);
  const [bloodSugarExpanded, setBloodSugarExpanded] = useState(false);
  const [allergiesExpanded, setAllergiesExpanded] = useState(false);
  const [remindersExpanded, setRemindersExpanded] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 md:pr-4">
          {/* Medications Section */}
          <div className={`mb-6 ${medicationsExpanded ? 'h-auto' : 'h-32'} max-w-md`}>
            <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
              Medications
              <button
                className="text-sm text-gray-500 focus:outline-none"
                onClick={() => setMedicationsExpanded(!medicationsExpanded)}
              >
                {medicationsExpanded ? 'See Less' : 'See More'}
              </button>
            </h2>
            <div
              className={`bg-white rounded-lg shadow-lg p-4 ${medicationsExpanded ? 'h-auto' : 'h-24'} overflow-hidden`}
            >
              {/* Display medications with title and subtitle */}
              {medicationsExpanded || medications.length === 0 ? (
                <div>
                  {medications.length === 0 ? (
                    <p className="text-gray-500">No Medications Have Been Added</p>
                  ) : (
                    medications.map((medication, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-gray-700 font-semibold">{medication.name}</p>
                        <p className="text-gray-500">{medication.instructions}</p>
                      </div>
                    ))
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 md:pl-4">
          {/* Latest Vitals Section */}
          <div className={`mb-6 ${heightExpanded || temperatureExpanded || bloodSugarExpanded ? 'h-auto' : 'h-20'} max-w-md`}>
            <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
              Latest Vitals
              <button
                className="text-sm text-gray-500 focus:outline-none"
                onClick={() => {
                  setHeightExpanded(!heightExpanded);
                  setTemperatureExpanded(!temperatureExpanded);
                  setBloodSugarExpanded(!bloodSugarExpanded);
                }}
              >
                {heightExpanded || temperatureExpanded || bloodSugarExpanded ? 'See Less' : 'See More'}
              </button>
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-4">
              {/* Height */}
              {heightExpanded && (
                <div className="mb-4">
                  <h3 className="text-gray-700 font-semibold">Height</h3>
                  <p className="text-gray-500">{latestVitals.height}</p>
                </div>
              )}
              {/* Temperature */}
              {temperatureExpanded && (
                <div className="mb-4">
                  <h3 className="text-gray-700 font-semibold">Temperature</h3>
                  <p className="text-gray-500">{latestVitals.temperature}</p>
                </div>
              )}
              {/* Blood Sugar */}
              {bloodSugarExpanded && (
                <div>
                  <h3 className="text-gray-700 font-semibold">Blood Sugar</h3>
                  <p className="text-gray-500">{latestVitals.bloodSugar}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Allergies Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
          Allergies
          <button
            className="text-sm text-gray-500 focus:outline-none"
            onClick={() => setAllergiesExpanded(!allergiesExpanded)}
          >
            {allergiesExpanded ? 'See Less' : 'See More'}
          </button>
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {allergiesExpanded ||
            allergies.map((allergy, index) => (
              <p key={index} className="text-gray-500">
                {allergy}
              </p>
            ))}
        </div>
      </div>

      {/* Reminders Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
          Reminders
          <button
            className="text-sm text-gray-500 focus:outline-none"
            onClick={() => setRemindersExpanded(!remindersExpanded)}
          >
            {remindersExpanded ? 'See Less' : 'See More'}
          </button>
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {remindersExpanded ||
            reminders.map((reminder, index) => (
              <p key={index} className="text-gray-500">
                {reminder}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HealthAnalytics;

