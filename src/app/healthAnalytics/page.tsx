// HealthAnalytics.tsx

import React from 'react';

const HealthAnalytics: React.FC = () => {
  // Example data (replace with actual data retrieval logic)
  const latestVitals = ['Blood Pressure', 'Heart Rate', 'Temperature'];
  const recentHealthIssues = ['Flu', 'Allergies'];
  const medications = ['Aspirin', 'Antihistamine'];
  const doctors = ['Dr. Smith', 'Dr. Johnson'];
  const appointments = ['Dentist - 15/04/2024', 'Checkup - 20/04/2024'];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Health Analytics</h1>

      {/* Display latest vitals */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Latest Vitals</h2>
        <ul>
          {latestVitals.map((vital, index) => (
            <li key={index}>{vital}</li>
          ))}
        </ul>
      </div>

      {/* Display recent health issues */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Health Issues</h2>
        <ul>
          {recentHealthIssues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </div>

      {/* Display medications */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Medications</h2>
        <ul>
          {medications.map((med, index) => (
            <li key={index}>{med}</li>
          ))}
        </ul>
      </div>

      {/* Display doctors */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Doctors</h2>
        <ul>
          {doctors.map((doctor, index) => (
            <li key={index}>{doctor}</li>
          ))}
        </ul>
      </div>

      {/* Display appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
        <ul>
          {appointments.map((appt, index) => (
            <li key={index}>{appt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthAnalytics;
