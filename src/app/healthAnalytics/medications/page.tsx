//This page will provide the users options to either add new medications or view all existing medications.

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import AddMedication from "../../components/AddMedication";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, LogOut } from "lucide-react";
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
      select: { id: true, createdAt: true, name: true, instructions: true, startDate: true },
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
    <>
        <header>
          <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                  <Link href="/" className="flex items-center">
                      <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">HealthMe</span>
                  </Link>
                  <div className="flex items-center">
                    <Link href="/login" className="px-4 py-1.5 mr-2 text-sm font-medium leading-6 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-800">Login</Link>
                    <Link href="/register" className="px-4 py-1.5 text-sm font-medium leading-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-md hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">Register</Link>
                  </div>
              </div>
            </nav>
        </header>
        <main className="flex items-center justify-center px-4 mx-auto max-w-screen-xl min-h-screen text-center lg:px-12">
          <div className="w-full">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">Your Personal <span className="fade-in-text bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Health Assistant.</span></h1>
            <p className="mb-8 text-lg font-normal  lg:text-xl sm:px-16 xl:px-48 text-gray-400">AI Expertise, Seamless Health Data Tracking, and Doctor Search</p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <Link href="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-indigo-600 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                    Get Started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
            </div>  
          </div>
        </main>
        <footer>
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm sm:text-center text-gray-400">© 2024 HealthMe™. All Rights Reserved.
                </span>
            </div>
          </div>
        </footer>
      </>
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
                  <a href="/chat"><SidebarItem icon={<History />} text="Chat History" active={true} /> </a>
          </Sidebar>
          <div className="flex-grow">
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
                        <p className="font-normal text-gray-400">Instructions: {medication?.instructions || ''}</p>
                        <p className="font-normal text-gray-400">Start Date: <ConvertToEasternTime utcDateString={medication?.startDate}></ConvertToEasternTime></p>
                      </div>
                      /*TODO: Display a small delete button*/
                    ))}
                  </div>
              </div>
            </div>
        </div>
      </main>
    );
  }
}