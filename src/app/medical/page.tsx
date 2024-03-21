"use client";
//ignore this file
import React from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import Image from 'next/image';
import { UserCircleIcon, ClipboardDocumentListIcon, PhoneIcon, CheckCircleIcon, ExclamationCircleIcon} from '@heroicons/react/24/solid'

function MedicalPage() {
  const itemClasses ={
    base: "py-5 px-10 w-full rounded-xl sm:py-3 sm:px-10",
    title: "font-normal text-sm  text-left lg:text-lg lg:font-normal lg:px-10 lg:py-3",
    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-sm px-11 center-y text-left bg-black rounded-lg space-y-2",
    background: "bg-slate-700 ",
    border: "border-2 border-white-500 rounded-lg",
    shadow: "shadow-lg color-white-500"
    
  };
  const defaultContent = "Fardeen Ahmed"
  return ( 
    
    <div className='grid grid-row-2 sm:grid-rows-1 text-white bg-black'>
      <div>
      <h2 className='text-2xl text-center py-10'>Patient Information</h2>
      </div>
      <div className='px-10 py-200 items-center justify-center sm:grid-col text-2xl'>
        <h1>Image goes here</h1>
      </div>
      
      <div className='grid grid-cols-2 gap-4 px-20 py-10'>
        <div className='col-span-1'>
          </div>
    
        <Accordion variant="splitted" itemClasses={itemClasses}>
          <AccordionItem title="Personal Information"
              startContent = {<UserCircleIcon className='h-15 w-10' />}
               className='border-10px bg-slate-700 shadow-yellow'>
              <h2>Name: Danny Devito</h2>
              <h2>Age: 23</h2>
              <h2>Date of Birth: 01/01/2001</h2>
              <h2>Email: danny@devito.com</h2>

            <div className=''>
              <button className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">  Edit  </button>
            </div>
         </AccordionItem>


        <AccordionItem title="Emergency Contact Information"
              startContent = {<PhoneIcon className='h-15 w-10' />}
               className='border-10px bg-slate-700'>
              <h2>Name: Frank Reynolds</h2>
              <h2>Phone: 999-888-2012</h2>
              <h2>RelationShip: Brother</h2>
  
            
        </AccordionItem>
       
        <AccordionItem title="Medical Information"
        startContent ={<ClipboardDocumentListIcon className='h-15 w-10' />}
        className='bg-slate-700'>
          
          <p>{defaultContent}</p>
        </AccordionItem>

        <AccordionItem title="Personal Care Physician"
              startContent = {<UserCircleIcon className='h-15 w-10' />}
               className='border-10px bg-slate-700'>
              <h2>Name: Fardeen Ahmed</h2>
              <h2>Age: 23</h2>
              <h2>Date of Birth: 01/01/2001</h2>
  
            
        </AccordionItem>
        
        
        <AccordionItem title="Vaccinations"
        startContent = {<CheckCircleIcon className='h-15 w-10' />}
        className='border-10px bg-slate-700'>
          <p>{defaultContent}</p>
        </AccordionItem>

        <AccordionItem title="Allergies" 
        startContent = {<ExclamationCircleIcon className='h-15 w-10' />}
        className='px-10 bg-slate-700 gap-10'>
          <p><li> Peanut </li>
              <li> Pollen </li>
              <li> Dust </li>
              <li> Penicillin </li>
          
          </p>
        </AccordionItem>
      </Accordion>


      </div>
    </div>
      
  )
}

export default MedicalPage