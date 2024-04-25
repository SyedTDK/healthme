//This page will provide the users options to either add new medications or view all existing medications.

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import AddMedication from "../../components/AddMedication";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, LogOut, Pill } from "lucide-react";
import ConvertToEasternTime from "../../components/ConvertToEasternTime";

// Decodes the current session data and use prisma to retrieve the current user in the database.
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

// Fetch medications for the current user
const getMedications = async (user: any) => {
  try {
    const medications = await prisma.medications.findMany({
      where: { userId: { equals: user?.id ?? undefined } },
      select: { id: true, createdAt: true, name: true, instructions: true, dose: true, frequency: true },
      orderBy: { createdAt: 'desc' }
    });
    return medications;
  } catch (error) {
    console.error('Error fetching medications:', error);
  }
}

export default async function New() {
  const user = await getCurrentUser();
  if(!(user)) {
    return (
        <main className="flex">
        <Sidebar>
                <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
                <a href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </a>
                <a href="#"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </a>
                <a href="/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </a>

                <a href="/chat"><SidebarItem icon={<History />} text="Chat History" active={true} /> </a>
        </Sidebar>
        <div className="container mx-auto p-6">
          <div className="flex mb-4">
            <div>Medications</div>
          </div>

          <div className="medication-list">
         
            <div className="medication-item mb-4 p-4 shadow rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-tablets mr-4"><circle cx="7" cy="7" r="5"/><circle cx="17" cy="17" r="5"/><path d="M12 17h10"/><path d="m3.46 10.54 7.08-7.08"/></svg>
                <div>
                  <div className="medication-name">name</div>
                  <div className="medication-dosage">dosage, frequency</div>  
                  <div className="text-sm text-gray-600">Effective from date:</div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
    );
  } else {
    // If a user is logged in, display the chat sessions page
    // This page will provide the users options to either create a new chat session or view past chat sessions.
    const medications = await getMedications(user);
    return (
      <main className="flex">
        <Sidebar>
                <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
                <a href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </a>
                <a href="#"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </a>
                <a href="/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </a>

                <a href="/chat"><SidebarItem icon={<History />} text="Chat History" active={true} /> </a>
        </Sidebar>
        {/*<div className="flex-grow">
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <AddMedication/>
                  <h2 className="mt-8 mb-4 text-3xl font-bold tracking-tight text-white">Medications</h2>
                  {medications?.length === 0 &&
                    <p className="text-gray-400">No past chat sessions found.</p>}
                  {medications?.map((medication: any, index: number) => (
                    <div 
                      key={medication.id || index} 
                      className="block max-w-sm p-6 mt-4 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
                    >
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-white">{medication?.name || ''} </h5>
                      <p className="font-normal text-gray-400">Dose: {medication?.dose || ''}</p>
                      <p className="font-normal text-gray-400">Frequency: {medication?.frequency || ''}</p>
                      <p className="font-normal text-gray-400">Instructions: {medication?.instructions || ''}</p>
                    </div>
                    /*TODO: Display a small delete button
                  ))}
                </div>
            </div>
          </div> 
          </div>*/}
        <AddMedication/>
        <div className="container mx-auto p-6">
          <div className="flex mb-4">
            <div>Medications</div>
          </div>


          <div className="medication-list">
          {medications?.length === 0 &&
                              <p className="text-gray-400">No past chat sessions found.</p>}
                            {medications?.map((medication: any, index: number) => (
            <div 
              className="medication-item mb-4 p-4 shadow rounded"
              key={medication.id || index}
              >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-tablets mr-4"><circle cx="7" cy="7" r="5"/><circle cx="17" cy="17" r="5"/><path d="M12 17h10"/><path d="m3.46 10.54 7.08-7.08"/></svg>
                <div>
                  <div className="medication-name">{medication?.name}</div>
                  <div className="medication-dosage">{medication?.dosage}, {medication?.frequency}</div>  
                  <div className="text-sm text-gray-600">Effective from date: {medication?.createdAt}</div>
                </div>
              </div>
            </div>))}
          </div>
        </div>

      </main>
    );
  }
}
