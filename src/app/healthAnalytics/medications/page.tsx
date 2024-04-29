//This page will provide the users options to either add new medications or view all existing medications.

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import AddMedication from "../../components/AddMedication";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, Pill, ShieldBan, ClipboardList } from "lucide-react";
import ConvertToEasternTime from "../../components/ConvertToEasternTime";
import Profile from "../../components/Profile";
import DeleteData from "@/app/components/DeleteData";

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
            <section className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-bold text-center text-white">Welcome to HealthMe</h1>
                <p className="text-lg text-center text-gray-300">Please login or register to access the application.</p>
            </section>
        </main>
        <footer>
            <div className="flex flex-col items-center justify-center py-4 text-sm text-gray-300">
                <p>© 2024 HealthMe. All rights reserved.</p>
                <p className="mt-2">Made with ❤️ by Team HealthMe</p>
            </div>
        </footer>
    </>
    );
  } else {
    // If a user is logged in, display the chat sessions page
    // This page will provide the users options to either create a new chat session or view past chat sessions.
    const medications = await getMedications(user);
    return (
      
       <main className="h-screen">
       <Profile user={user}/>
       <div className="flex">
       <Sidebar>
         <Link href="/healthAnalytics"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </Link>
         <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
         <Link href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </Link>
         <Link href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </Link>
         <Link href="/healthAnalytics/vitals"><SidebarItem icon={<ClipboardList />} text="Logbook" active={false} /> </Link>
         <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={true} /> </Link>
         <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={false} /> </Link>
       </Sidebar>
         {/* <!-- Header --> */}
         <div className="w-full ml-4 mr-4">
         <AddMedication />
         <div className="items-center mb-1">
           <h2 className="text-2xl font-semibold">Medications</h2>
         </div>
         <div className="items-center mb-3">
           <h2 className="text-xs text-gray-500">Refresh the page to update the list.</h2>
         </div>

         {/* <!-- Items --> */}
         <div className="space-y-4">
           {/* <!-- Single Item --> */}
          {medications?.length === 0 && 
            <p className="text-center text-gray-500">No medications added yet.</p>}
          {medications?.map((medication: any, index: number) => (

           <div 
            key={medication.id || index}
            className="flex items-center bg-gray-900 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
           >
             <div className="p-2 ml-2 rounded-2xl bg-gray-800 text-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-tablets"><circle cx="7" cy="7" r="5"/><circle cx="17" cy="17" r="5"/><path d="M12 17h10"/><path d="m3.46 10.54 7.08-7.08"/></svg>             
             </div>
             <div className="flex-grow p-4 rounded-lg flex justify-between items-center">
               <div>
                 <p className="text-sm font-semibold"><ConvertToEasternTime utcDateString={medication?.createdAt?.toString()}></ConvertToEasternTime></p>
                 <h3 className="text-lg font-bold">{medication?.name}</h3>
                 <div className="flex">
                   <span className="mr-2">{medication?.dose}, {medication?.frequency}, Instructions: {medication?.instructions}</span>
                 </div>
               </div>
               <DeleteData dataId={medication?.id} type="medication"></DeleteData>
             </div>
           </div>
          ))}
          </div>
          </div>
     </div>
     </main>
    );
  }
}
