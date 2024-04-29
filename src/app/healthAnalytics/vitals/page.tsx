//This page will display all the vitals and option to add new vitals.

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, LogOut, Pill } from "lucide-react";
import ConvertToEasternTime from "../../components/ConvertToEasternTime";
import AddVitals from "@/app/components/AddVitals";


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

const getVitals = async (user: any) => {
    try {
      const vitals = await prisma.vitals.findMany({
        where: { userId: { equals: user?.id ?? undefined } },
        orderBy: { createdAt: 'desc' }
      });
      return vitals;
    } catch (error) {
      console.error('Error fetching vitals:', error);
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
            <main>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Welcome to HealthMe</h1>
                        <p className="text-gray-500">Please login to continue</p>
                    </div>
                </div>
            </main>
        </>
        );
    } else {

    const vitals = await getVitals(user);
    return (
        <main className="flex">
        <Sidebar>
                <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
                <a href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </a>
                <a href="#"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </a>
                <a href="/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </a>

                <a href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </a>
        </Sidebar>
        {/*List all the vitals here. Show proper unit for each type of vital. Check to see vital type then render appropriate units*/}
        <div className="flex-1 p-10">
            <div className="flex justify-end">
                <AddVitals />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Logbook</h1>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {vitals?.length === 0 &&
                      <p className="text-gray-400">No vitals recorded</p>}
                    {vitals?.map((vital: any, index: number) => (
                      <div 
                        key={vital.id || index} 
                        className="block max-w-sm p-6 mt-4 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
                      >
                            <h2 className="text-xl font-semibold text-gray-800">{vital.type}</h2>
                            <p className="text-gray-500">Recorded on <ConvertToEasternTime utcDateString={vital?.createdAt}></ConvertToEasternTime></p>
                            {vital.type === 'bloodPressure' && <p className="text-gray-500">Systolic: {vital?.systolic}, Diastolic: {vital.diastolic}</p>}
                            {vital.type === 'weight' && <p className="text-gray-500">Weight: {vital?.weight} lbs</p>}
                            {vital.type === 'temperature' && <p className="text-gray-500">Temperature: {vital?.temperature} °F</p>}
                            {vital.type === 'menstruation' && <p className="text-gray-500">Flow: {vital?.flow} Color: {vital?.color} Consistency: {vital?.consistency}</p>}
                            {vital.type === 'cholesterol' && <p className="text-gray-500">Total: {vital?.total} mg/dL</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main>
    );
    }
}