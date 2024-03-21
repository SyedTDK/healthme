
import React from 'react'
import PersonalInfo from "@/app/components/PersonalInfo";
import EmergencyInfo from "@/app/components/EmergencyInfo";
import Pcp from "@/app/components/Pcp";
import VaccineInfo from "@/app/components/VaccineInfo";
import AllergyInfo from "@/app/components/AllergyInfo";
import PhysicalInfo from "@/app/components/PhysicalInfo";







export default async function profile() {

    

  return (
    <div className='bg-black text-white min-h-screen'>
    <div className='grid items-center justify-center px-10 py-20 space-y-4
    '>
    {/* md:grid-rows-min md:grid-cols-2 md:px-40 md:py-10 md:gap-5 md:space-y-4 */}
    
   
    {/* personal information */}
   <PersonalInfo/>

    {/* emergency contact */}
  <EmergencyInfo/>


    {/* physical information */}
    <PhysicalInfo/>


    {/* personal care physician */}
    <Pcp/>
  

    {/* Vaccinations */}
    <VaccineInfo/>
 

    {/* Allergy */}
    <AllergyInfo/>
  
  </div>
  </div>
  )
}
