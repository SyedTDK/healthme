//ignore this file
"use client"
import React, { useEffect, useState } from 'react'
import {Accordion, AccordionItem, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import Image from 'next/image';
import { UserCircleIcon, ClipboardDocumentListIcon, PhoneIcon, CheckCircleIcon, ExclamationCircleIcon, TrashIcon} from '@heroicons/react/24/solid'
import { CurrencyDollarIcon } from '@heroicons/react/16/solid';


function MedicalPage() {


  const itemClasses ={
    
    base: "py-5 px-10 w-full rounded-xl sm:py-3 sm:px-10 bg-teal-700",
    title: "font-normal font-bold text-sm md:text-md  md:font-bold text-left",
    trigger: "px-5 py-0 data-[hover=true]:bg-teal-700 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-sm md:text-lg px-11 center-y text-left bg-black rounded-lg space-y-4",
    border: "border-2 border-white-500 rounded-lg",
    showDivider: "true",
    
  };

  //personalInfo 
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    age: "",
    birthDate: "",
    email: "",
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
        const response = await fetch("/api/user");
        if(!response.ok) {
            console.log("Error fetching user data");
            return;
        }
        const user = await response.json();
        setPersonalInfo({
            name: user.name || '',
            age: user.birthDate ? calculateAge(new Date(user.birthDate)).toString() : '',
            birthDate: formatDate(user.birthDate) || '',
            email: user.email || '',
          });
        };
    
        fetchCurrentUser();
      }, []);

  // Emergency Contact Information State
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    Ename: "Frank Reynolds",
    Ephone: "999-888-2012",
    relationship: "Brother",
  });

  // State for Personal Care Physician
  const [isEditingPhysician, setIsEditingPhysician] = useState(false);
  const [physicianInfo, setPhysicianInfo] = useState({
    Pcpname: "Dr. John Doe",
    Pcpphone: "9293901932",
    Pcpaddress: "910 west 4th street, New York, 10001",
  });

  
  const handleEdit = (setEditState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setEditState(true);
  };

const saveChangesPersonal = async () => {
    const response = await fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInfo),
    });

    if (!response.ok) {
        console.log("Error saving user data");
        return response.statusText;
    }
    setIsEditingPersonal(false);
};

const saveChangesContact = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    
};

const saveChangesPcp = (field: string, value: string) => {
    setPhysicianInfo(prev => ({ ...prev, [field]: value }));
    
};

const handleSave = (setEditState: React.Dispatch<React.SetStateAction<boolean>>) => {
    
    
    setEditState(false);
};

// State for Vaccines
const [vaccines, setVaccines] = useState<string[]>(['Flu', 'Covid-19', 'Tetanus']);
const [isEditingVaccines, setIsEditingVaccines] = useState<boolean>(false);
const [newVaccine, setNewVaccine] = useState<string>('');

// Function to add a new vaccine
const handleAddVaccine = () => {
  if (newVaccine.trim()) {
    setVaccines([...vaccines, newVaccine]);
    setNewVaccine(''); // Clear input
  }
};

// Function to delete a vaccine
const handleDeleteVaccine = (index: number) => {
  setVaccines(vaccines.filter((_, i) => i !== index));
};


//Allergy information
const [allergies, setAllergies] = useState<string[]>(['Peanut', 'Pollen', 'Dust', 'Penicillin']);
const [isEditingAllergies, setIsEditingAllergies] = useState<boolean>(false);
const [newAllergy, setNewAllergy] = useState<string>('');

// Function to add a new allergy
const handleAddAllergy = () => {
  if (newAllergy.trim()) {
    setAllergies([...allergies, newAllergy]);
    setNewAllergy(''); // Clear input
  }
};

// Function to delete an allergy
const handleDeleteAllergy = (index: number) => {
  setAllergies(allergies.filter((_, i) => i !== index));
};



  return ( 
    
    
    // <div className='grid grid-row-2 sm:grid-rows-1 text-white bg-black'>
    //   <div>
    //   <h2 className='text-2xl text-center py-10'>Patient Information</h2>
    //   </div>
    
      
      <div className='gap-4 w-400 px-20 py-10 text-white bg-black'>
        <div className='col-span-1 md:grid md:grid-rows-3'>
          </div>

        
        {/* personal information */}
        <Accordion variant="splitted" itemClasses={itemClasses}>
        <AccordionItem title="Personal Information" startContent={<UserCircleIcon className='h-15 w-10' />}>
        {isEditingPersonal ? (
           <div>
           <input 
               type="text" 
               placeholder="Name" 
               className="w-full p-2 my-2 border-2 rounded text-black" 
               value={personalInfo.name}
               onChange={(e) => setPersonalInfo({...personalInfo, name:e.target.value})} 
           />
           <input 
               type="text" 
               placeholder="Date of Birth"  
               className="w-full p-2 my-2 border-2 rounded text-black" 
               value={personalInfo.birthDate}
               onChange={(e) => setPersonalInfo({...personalInfo, birthDate:e.target.value})}
           />  
           <input 
               type="text" 
               name="email" 
               className="w-full p-2 my-2 border-2 rounded text-black" 
               placeholder="Email" 
               value={personalInfo.email}
               onChange={(e) => setPersonalInfo({...personalInfo, email:e.target.value})} 
           />
       </div>
        ) : (
          <div>
            <h2>Name: {personalInfo.name}</h2>
            <h2>Age: {personalInfo.age}</h2>
            <h2>Date of Birth: {formatDate(personalInfo.birthDate)}</h2>
            <h2>Email: {personalInfo.email}</h2>
          </div>
        )}
        <Divider />
        {isEditingPersonal ? (
            <button onClick={saveChangesPersonal} className="w-20 px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white cursor-pointer font-semibold">Save</button>
        ) : (
            <button onClick={() => handleEdit(setIsEditingPersonal)} className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">Edit</button>
        )}
      </AccordionItem>




         {/* Emergency Contact Information */}
         <AccordionItem title="Emergency Contact Information" startContent={<PhoneIcon className='h-15 w-10' />}>
          {isEditingContact ? (
            <div>
             <input 
               type="text" 
               placeholder="Name" 
               className="w-full p-2 my-2 border-2 rounded text-black" 
               value={contactInfo.Ename}
               onChange={(e) => saveChangesContact('Ename', e.target.value)} 
           />
           <input 
               type="text" 
               placeholder="Phone Number"  
               className="w-full p-2 my-2 border-2 rounded text-black" 
               value={contactInfo.Ephone}
               onChange={(e) => saveChangesContact('Ephone', e.target.value)} 
           />  
           <input 
               type="text" 
               name="relationship" 
               className="w-full p-2 my-2 border-2 rounded text-black" 
               placeholder="relationship" 
               value={contactInfo.relationship}
               onChange={(e) => saveChangesContact('relationship', e.target.value)} 
           />
            </div>
          ) : (
            <div>
              <h2>Name: {contactInfo.Ename}</h2>
              <h2>Phone: {contactInfo.Ephone}</h2>
              <h2>Relationship: {contactInfo.relationship}</h2>
            </div>
          )}
          <Divider />
          {isEditingContact ? (
            <button onClick={() => handleSave(setIsEditingContact)} className="w-20 px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white cursor-pointer font-semibold">Save</button>
        ) : (
            <button onClick={() => handleEdit(setIsEditingContact)} className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">Edit</button>
        )}
        </AccordionItem>
       




        {/* Medical Information */}
        <AccordionItem title="Medical Information"
        startContent ={<ClipboardDocumentListIcon className='h-15 w-10' />}>
          
          <p>
            <h2>height: 5.11</h2>
            <h2>Weight: 150 lbs</h2>
            <h2>Blood Type: A+</h2>
            <h2>Insurance: Aetna</h2>

          </p>

          <div className=''>
              <Divider/>
              <button className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">  Edit  </button>
            </div>
        </AccordionItem>







  
          {/* Personal Care Physician */} 
        <AccordionItem title="Personal Care Physician"
              startContent = {<CurrencyDollarIcon className='h-15 w-10' />}>
              {isEditingPhysician ? (
            <div>
             <input 
               type="text" 
               placeholder="Name" 
               className="w-full p-2 my-2 border-2 rounded text-black" 
               value={physicianInfo.Pcpname}
               onChange={(e) => saveChangesPcp('Pcpname', e.target.value)} 
           />
           <input 
               type="text" 
               placeholder="Phone Number"  
               className="w-full p-2 my-2 border-2 rounded text-black" 
               value={physicianInfo.Pcpphone}
               onChange={(e) => saveChangesPcp('Pcpphone', e.target.value)} 
           />  
           <input 
               type="text" 
               name="Address" 
               className="w-full p-2 my-2 border-2 rounded text-black" 
               placeholder="relationship" 
               value={physicianInfo.Pcpaddress}
               onChange={(e) => saveChangesPcp('Pcpaddress', e.target.value)} 
           />
            </div>
          ) : (
            <div>
              <h2>Name: {physicianInfo.Pcpname}</h2>
              <h2>Phone: {physicianInfo.Pcpphone}</h2>
              <h2>Relationship: {physicianInfo.Pcpaddress}</h2>
            </div>
          )}
          <Divider />
          {isEditingPhysician ? (
            <button onClick={() => handleSave(setIsEditingPhysician)} className="w-20 px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white cursor-pointer font-semibold">Save</button>
        ) : (
            <button onClick={() => handleEdit(setIsEditingPhysician)} className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">Edit</button>
        )}
        </AccordionItem>
        




        {/* Vaccinations */}
      <AccordionItem title="Vaccinations" startContent={<CheckCircleIcon className='h-15 w-10' />}>
        {isEditingVaccines ? (
          <>
            {vaccines.map((vaccine, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{vaccine}</p>
                <button onClick={() => handleDeleteVaccine(index)} className="text-red-500 hover:text-red-700">
                  <TrashIcon className='w-5 h-5' />
                </button>
              </div>
            ))}
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
          </>
        ) : (
          vaccines.map((vaccine, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{vaccine}</p>
            </div>
          ))
        )}
        <Divider />
        <button onClick={() => setIsEditingVaccines(!isEditingVaccines)} className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">
          {isEditingVaccines ? 'Done' : 'Edit'}
        </button>
      </AccordionItem>







        {/* Allergies */}
        {/* Allergies Accordion Item */}
      <AccordionItem title="Allergies" startContent={<ExclamationCircleIcon className='h-15 w-10' />}>
        {isEditingAllergies ? (
          <>
            {allergies.map((allergy, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{allergy}</p>
                <button onClick={() => handleDeleteAllergy(index)} className="text-red-500 hover:text-red-700">
                  <TrashIcon className='w-5 h-5' />
                </button>
              </div>
            ))}
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
          </>
        ) : (
          allergies.map((allergy, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{allergy}</p>
            </div>
          ))
        )}
        <Divider />
        <button onClick={() => setIsEditingAllergies(!isEditingAllergies)} className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">
          {isEditingAllergies ? 'Done' : 'Edit'}
        </button>
      </AccordionItem>
      </Accordion>


      </div>
    // </div>
      
  )
}

function calculateAge(birthDate: Date) {
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


  function formatDate(isoDateString: string): string {
    // Check if the input string is a valid date string
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
      // If the date is not valid, return an empty string or some placeholder
      return "Invalid date";
    }
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
  }

export default MedicalPage