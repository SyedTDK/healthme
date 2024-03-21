"use client"
import React, { useState } from 'react'
import {Card, CardHeader, CardBody, Divider, Image, CardFooter} from "@nextui-org/react";
import { CurrencyDollarIcon } from '@heroicons/react/16/solid';



//Decodes the current session data and use prisma to retrieve the current user in the database.







export default async function Pcp() {
    
  return (
    <div>
         {/* personal care physician */}
  <Card className="max-w-[400px] border-4 rounded-xl">
    <CardHeader className="bg-teal-500 gap-3 rounded-l">
      <CurrencyDollarIcon className='w-16 h-16' />
      <div className="flex flex-col">
        <p className="text-lg font-bold">Personal Care Physician</p>
        <p className="text-small text-default-500"></p>
      </div>
    </CardHeader>
    <Divider className='border-white'/>
    <CardBody>
      <p>Doctor: </p>
      <p>Phone: </p>
      <p>Email: </p>
      <p>Address: </p>
      
    </CardBody>
    <Divider/>
    <CardFooter>
    <button className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">  Edit  </button>
            
    </CardFooter>
  </Card>
   
   
   
</div>
  );
}