//This page will display all the vitals and option to add new vitals.

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, Pill, ClipboardList, ShieldBan } from "lucide-react";
import ConvertToEasternTime from "../../components/ConvertToEasternTime";
import AddVitals from "@/app/components/AddVitals";
import Profile from "@/app/components/Profile";
import DeleteData from "@/app/components/DeleteData";


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
            // <main className="h-screen">
            //   <Profile user={user}/>
            //   <div className="flex">
            //   <Sidebar>
            //     <Link href="/healthAnalytics"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </Link>
            //     <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
            //     <Link href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </Link>
            //     <Link href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </Link>
            //     <Link href="/healthAnalytics/vitals"><SidebarItem icon={<ClipboardList />} text="Logbook" active={true} /> </Link>
            //     <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </Link>
            //     <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={false} /> </Link>
            //   </Sidebar>
            //     {/* <!-- Header --> */}
            //     <div className="w-full ml-4 mr-4">
            //     <AddAllergy />
            //     <div className="items-center mb-1">
            //       <h2 className="text-2xl font-semibold">Logbook</h2>
            //     </div>
            //     <div className="items-center mb-3">
            //       <h2 className="text-xs text-gray-500">Refresh the page to update the list.</h2>
            //     </div>

            //     {/* <!-- Log Items --> */}
            //     <div className="space-y-4">
            //       {/* <!-- Single Log Item --> */}
            //       <div className="flex items-center bg-gray-900 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
            //         <div className="p-2 ml-2 rounded-2xl bg-gray-800 text-gray-700">
            //           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sandwich"><path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/><path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"/><path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"/><path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"/></svg>
            //         </div>
            //         <div className="flex-grow p-4 rounded-lg flex justify-between items-center">
            //           <div>
            //             <p className="text-sm font-semibold">Wed, 24 Apr</p>
            //             <h3 className="text-lg font-bold">Cholesterol</h3>
            //             <div className="flex">
            //               <span className="mr-2">Total: 3</span>
            //               <span className="mr-2">LDL: 0</span>
            //               <span className="mr-2">HDL: 0</span>
            //               <span>Triglycerides: 0</span>
            //             </div>
            //           </div>
            //           <div className="flex text-red-600">
            //           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            //           </div>
            //         </div>
            //       </div>
            //       {/* <!-- More Log Items... --> */}
            //       <div className="flex items-center bg-gray-900 rounded-lg">
            //         <div className="flex-grow p-4 rounded-lg flex justify-between items-center">
            //           <div>
            //             <p className="text-sm font-semibold">Thurs, 25 Apr</p>
            //             <h3 className="text-lg font-bold">Menstruation</h3>
            //             <div className="flex">
            //               <span className="mr-2">FLow: 3</span>
            //               <span className="mr-2">Color: 0</span>
            //             </div>
            //           </div>
            //           <div className="flex">
            //           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            // </main>

        );
    } else {

      const vitals = await getVitals(user);
      return (
        <main className="h-screen">
          <Profile user={user}/>
          <div className="flex">
          <Sidebar>
            <Link href="/healthAnalytics"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </Link>
            <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
            <Link href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </Link>
            <Link href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </Link>
            <Link href="/healthAnalytics/vitals"><SidebarItem icon={<ClipboardList />} text="Logbook" active={true} /> </Link>
            <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </Link>
            <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={false} /> </Link>
          </Sidebar>
          {/*List all the vitals here. Show proper unit for each type of vital. Check to see vital type then render appropriate units*/}
          {/* <!-- Header --> */}
            <div className="w-full ml-4 mr-4">
              <AddVitals />
              <div className="items-center mb-1">
                <h2 className="text-2xl font-semibold">Logbook</h2>
              </div>
              <div className="items-center mb-3">
                <h2 className="text-xs text-gray-500">Refresh the page to update the list.</h2>
              </div>

              {/* <!-- Log Items --> */}
              <div className="space-y-4">
                {/* <!-- Single Log Item --> */}
                {vitals?.length === 0 && 
                  <p className="text-center text-gray-500">No vitals logged yet.</p>}
                {vitals?.map((vital: any, index: number) => (
                <div
                  key={vital.id || index} 
                  className="flex items-center bg-gray-900 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
                >
                    <div className="p-2 ml-2 rounded-2xl bg-gray-800 text-gray-700">
                    {vital.type === 'bloodPressure' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart-pulse"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>                    
                    }
                    {vital.type === 'temperature' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-thermometer"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                    }
                    {vital.type === 'weight' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-weight"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/></svg>
                    }
                    {vital.type === 'menstruation' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                    }
                    {vital.type === 'cholesterol' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sandwich"><path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/><path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"/><path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"/><path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"/></svg>
                    }
                    </div>
                  
                    <div className="flex-grow p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold"><ConvertToEasternTime utcDateString={vital.createdAt.toString()}></ConvertToEasternTime></p>
                        {vital.type === 'bloodPressure' &&
                        <div>
                          <h3 className="text-lg font-bold">Blood Pressure</h3>
                          <div className="flex">
                            <span className="mr-2">Systolic: {vital?.systolic}</span>
                            <span className="mr-2">Diastolic: {vital?.diastolic}</span>
                          </div>
                        </div>
                        }
                        {vital.type === 'temperature' &&
                        <div>
                          <h3 className="text-lg font-bold">Temperature</h3>
                          <div className="flex">
                            <span className="mr-2">{vital?.value} °F</span>
                          </div>
                          </div>
                        }
                        {vital.type === 'weight' &&
                        <div>
                          <h3 className="text-lg font-bold">Weight</h3>
                          <div className="flex">
                            <span className="mr-2">{vital?.value} lbs</span>
                          </div>
                          </div>
                        }
                        {vital.type === 'menstruation' &&
                        <div>
                          <h3 className="text-lg font-bold">Menstruation</h3>
                          <div className="flex">
                            <span className="mr-2">Flow: {vital?.flow}</span>
                            <span className="mr-2">Color: {vital?.color}</span>
                            <span className="mr-2">Consistency: {vital?.consistency}</span>
                          </div>
                          </div>
                        }
                        {vital.type === 'cholesterol' &&
                        <div>
                          <h3 className="text-lg font-bold">Cholesterol</h3>
                          <div className="flex">
                            <span className="mr-2">Total: {vital?.value} mg/dL</span>
                          </div>
                          </div>
                        }
                      </div>
                      
                      <DeleteData dataId={vital.id} type="vital" ></DeleteData>
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