
import React from 'react'
import {Card, CardHeader, CardBody, Divider, CardFooter} from "@nextui-org/react";
import { PhoneIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";

//Decodes the current session data and use prisma to retrieve the current user in the database.
const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!currentUser) return;
    return currentUser;
  } catch (e: any) {
    // simply ignores if no user is logged in
    return;
  }
};






export default async function EmergencyInfo() {

    const user = await getCurrentUser();

  return (
    <div>

   
   
    {/* personal information */}
      {/* emergency contact */}
  <Card className="max-w-[400px] border-4 rounded-xl">
    <CardHeader className="bg-teal-500 gap-3 rounded-l">
      <PhoneIcon className='w-16 h-16' />
      <div className="flex flex-col">
        <p className="text-lg font-bold">Emergency Contact</p>
        <p className="text-small text-default-500"></p>
      </div>
    </CardHeader>
    <Divider className='border-white'/>
    <CardBody>
      <p>Name: </p>
        <p>Phone: </p>
        <p>Email:   </p>
        <p>Relation: </p>
    </CardBody>
    <Divider/>
    <CardFooter>
    <button className="w-20 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold">  Edit  </button>
            
    </CardFooter>
  </Card>
</div>
  );
}