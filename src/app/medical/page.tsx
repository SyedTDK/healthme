import React from 'react'

function MedicalPage() {
  return ( 
    <div className='bg-black text-white h-screen'>
      <div className='text-center justify-center'>
        <div className='text-center text-indigo-600 p-5 text-5xl font-bold size-50'>Medical Page</div>
        <div className='grid grid-cols-2 border-rose-50 text-left p-10 text-2xl space-y-4 text-wrap'>
          <div className='grid grid-flow-col'>
            <h1>Name: Fardeen</h1>
            <h1>Age: 25</h1>
            <h1>Height: 5'9</h1>
            <h1>Weight: 150 lbs</h1>
            <h1> Medical Issues: 
              <ul>
                <li>Diabetes</li>
                <li>High Blood Pressure</li>
                <li>High Cholesterol</li>
              </ul>
            </h1>
              <h1>Medications:</h1>
              <ul>
                <li>Insulin</li>
                <li>Metformin</li>
                <li>Lisinopril</li>
                <li>Atorvastatin</li>
              </ul>
            
          </div>
          <div className='text-center justify-center'>
            <img src='https://www.w3schools.com/w3images/lights.jpg' alt='Fardeen' className='h-50 w-50 align-middle' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default MedicalPage