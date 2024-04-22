"use client"

import React, { useState } from 'react';

const HealthAnalytics: React.FC = () => {
  // Example data (replace with actual data retrieval logic)
  const userName = "Mohammed"; // Replace with actual user name data
  const latestVitals = {
    height: '300 cm', // Example data
    temperature: '30 °C', // Example data
    bloodSugar: '2 mmol/L', // Example data
  };
  const medications = []; // Assuming no medications, as per the image
  const doctors = ['Dr. Smith', 'Dr. Johnson','Dr. Smith', 'Dr. Johnson','Dr. Smith', 'Dr. Johnson']; // Add actual doctor data
  const bloodPressureData = []; // You will need to retrieve and format blood pressure data for charts

  // State to manage expansion of each section
  const [medicationsExpanded, setMedicationsExpanded] = useState(false);
  const [vitalsExpanded, setVitalsExpanded] = useState(false);
  const [doctorsExpanded, setDoctorsExpanded] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Hello {userName}!</h1>

      {/* Medications Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
          Medications
          <button
            className="text-sm text-gray-500 focus:outline-none"
            onClick={() => setMedicationsExpanded(!medicationsExpanded)}
          >
            {medicationsExpanded ? 'See Less' : 'See More'}
          </button>
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* Logic to check and display 'No Medications Have Been Added' or list of medications */}
          {medicationsExpanded || medications.length === 0 ? (
            <p className="text-gray-500">
              {medications.length === 0 ? 'No Medications Have Been Added' : 'Display medications here...'}
            </p>
          ) : null}
        </div>
      </div>

      {/* Latest Vitals Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
          Latest Vitals
          <button
            className="text-sm text-gray-500 focus:outline-none"
            onClick={() => setVitalsExpanded(!vitalsExpanded)}
          >
            {vitalsExpanded ? 'See More' : 'See Less'}
          </button>
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Display latest vitals */}
          {vitalsExpanded ||
          Object.entries(latestVitals).map(([key, value], index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-gray-500">{key}: {value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
          Your Doctors
          <button
            className="text-sm text-gray-500 focus:outline-none"
            onClick={() => setDoctorsExpanded(!doctorsExpanded)}
          >
            {doctorsExpanded ? 'See More' : 'See Less'}
          </button>
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {doctorsExpanded || doctors.map((doctor, index) => (
            <p key={index} className="text-gray-500">{doctor}</p>
          ))}
        </div>
      </div>

      {/* Additional sections such as Charts or Upcoming Appointments can be added here */}
    </div>
  );
};

export default HealthAnalytics;
