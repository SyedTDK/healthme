//This page will display all health analytics data for the user.
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Profile from "@/app/components/Profile";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, Pill, ClipboardList, ShieldBan } from "lucide-react";
import ConvertToEasternTime from "../components/ConvertToEasternTime";

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

const getMedications = async (user: any) => {
  try {
    const medications = await prisma.medications.findMany({
      where: { userId: { equals: user?.id ?? undefined } },
      select: { id: true, createdAt: true, name: true, instructions: true, dose: true, frequency: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    });
    return medications;
  } catch (error) {
    console.error('Error fetching medications:', error);
  }
}

const getVitals = async (user: any) => {
  try {
    const vitals = await prisma.vitals.findMany({
      where: { userId: { equals: user?.id ?? undefined } },
      orderBy: { createdAt: 'desc' },
      take: 3
    });
    return vitals;
  } catch (error) {
    console.error('Error fetching vitals:', error);
  }
}

const getAllergies = async (user: any) => {
  try {
    const allergies = await prisma.allergies.findMany({
      where: { userId: { equals: user?.id ?? undefined } },
      orderBy: { createdAt: 'desc' },
      take: 3
    });
    return allergies;
  } catch (error) {
    console.error('Error fetching allergies:', error);
  }
}

const getChatSessions = async (user: any) => {
  try {
    const chatSessions = await prisma.chatSession.findMany({
      where: { userId: { equals: user?.id ?? undefined } },
      select: { id: true, createdAt: true, symptoms: true, diagnosis: true},
      orderBy: { createdAt: 'desc' },
      take: 3
    });
    return chatSessions;
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
  }
}


export default async function HealthAnalytics() {
  // Example data (replace with actual data retrieval logic)
  
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
    const medications = await getMedications(user);
    const vitals = await getVitals(user);
    const allergies = await getAllergies(user);
    const chatSessions = await getChatSessions(user);

    return (
      <main className="h-screen">
      <Profile user={user}/>
      <div className="flex">
        <Sidebar>
          <Link href="/healthAnalytics"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={true} /> </Link>
          <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
          <Link href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </Link>
          <Link href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </Link>
          <Link href="/healthAnalytics/vitals"><SidebarItem icon={<ClipboardList />} text="Logbook" active={false} /> </Link>
          <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </Link>
          <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={false} /> </Link>
        </Sidebar>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 md:pr-4">
              {/* Medications Section */}
              <div className="mb-6 h-auto">
                <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
                  Medications
                  <Link
                    className="text-sm text-gray-500 focus:outline-none underline"
                    href="/healthAnalytics/medications"
                  >
                    See All
                  </Link>
                </h2>
                <div
                  className={`  rounded-lg shadow-lg h-auto overflow-hidden`}
                >
                  {/* Display three medications */}
                  {medications?.length === 0 &&
                    <div className="p-4 text-center text-gray-200">
                      No medications found
                    </div>
                  }
                  {medications?.map((medication: any, index: number) => (
                  
                  
                  <div 
                    key={medication.id || index}
                    className="grid grid-cols-1 gap-4 m-2"
                  >
                    <div className=" bg-gray-700 p-4 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-tablets"><circle cx="7" cy="7" r="5"/><circle cx="17" cy="17" r="5"/><path d="M12 17h10"/><path d="m3.46 10.54 7.08-7.08"/></svg>             

                      <div>
                        <h3 className="text-lg font-semibold">{medication?.name}</h3>
                        <p className="text-sm text-gray-500">{medication?.dose}, {medication?.frequency}, Instructions: {medication?.instructions}</p>
                      </div>
                    </div>
                  </div>
                  ))}
                      
                    
                  
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 md:pl-4">
              {/* Latest Vitals Section */}
              <div className={`mb-6 h-auto max-w-md`}>
                <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
                  Latest Vitals
                  <Link
                    className="text-sm text-gray-500 focus:outline-none underline"
                    href="/healthAnalytics/vitals"
                  >
                    See All
                  </Link>
                </h2>
                <div
                  className={` rounded-lg shadow-lg h-auto overflow-hidden`}
                >
                  {/* Display last three vitals */}
                  {vitals?.length === 0 &&
                    <div className="p-4 text-center text-gray-200">
                      No vitals added
                    </div>
                  }
                  {vitals?.map((vital: any, index: number) => (
                  
                  
                  <div 
                    key={vital.id || index}
                    className="grid grid-cols-1 gap-4 m-2"
                  >
                    <div className=" bg-gray-700 p-4 rounded-lg flex items-center">
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
                    {vital.type === 'bloodPressure' &&
                      <div>
                        <h3 className="text-lg font-semibold">Blood Pressure</h3>
                        <p className="text-sm text-gray-500">Systolic: {vital?.systolic}, Diastolic: {vital?.diastolic}</p>
                      </div>
                    }
                    {vital.type === 'temperature' &&
                      <div>
                        <h3 className="text-lg font-semibold">Temperature</h3>
                        <p className="text-sm text-gray-500">{vital?.value} °F</p>
                      </div>
                    }
                    {vital.type === 'weight' &&
                      <div>
                        <h3 className="text-lg font-semibold">Weight</h3>
                        <p className="text-sm text-gray-500">{vital?.value} lbs</p>
                      </div>
                    }
                    {vital.type === 'menstruation' &&
                      <div>
                        <h3 className="text-lg font-semibold">Menstruation</h3>
                        <p className="text-sm text-gray-500">Flow: {vital?.flow}, Color: {vital?.color}, Consistency: {vital?.consistency}</p>
                      </div>
                    }
                    {vital.type === 'cholesterol' &&
                      <div>
                        <h3 className="text-lg font-semibold">Cholesterol</h3>
                        <p className="text-sm text-gray-500">Total: {vital?.value} mg/dL</p>
                      </div>
                    }
                    </div>
                  </div>
                  ))}
                      
                    
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* Allergies Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
              Allergies
              <Link
                className="text-sm text-gray-500 focus:outline-none underline"
                href="/healthAnalytics/allergies"
              >
                See All
              </Link>
            </h2>
            {allergies?.length === 0 &&
                    <div className="p-4 text-center text-gray-200">
                      No allergies added
                    </div>
                  }
                  {allergies?.map((allergy: any, index: number) => (
                  
                  
                  <div 
                    key={allergy.id || index}
                    className="grid grid-cols-1 gap-4 m-2"
                  >
                    <div className=" bg-gray-700 p-4 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-wheat-off"><path d="m2 22 10-10"/><path d="m16 8-1.17 1.17"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"/><path d="M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"/><path d="M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"/><line x1="2" x2="22" y1="2" y2="22"/></svg>              
                      <div>
                        <h3 className="text-lg font-semibold">{allergy?.name}</h3>
                        <p className="text-sm text-gray-500">Type: {allergy?.type}, Medications: {allergy?.medications}, Description: {allergy?.description}</p>
                      </div>
                    </div>
                  </div>
                  ))}
          </div>

          {/* Recent Health Issues  */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
              Recent Health Issues
              <Link
                className="text-sm text-gray-500 focus:outline-none underline"
                href="/chat"
              >
                See All
              </Link>
            </h2>
            {chatSessions?.length === 0 &&
                    <div className="p-4 text-center text-gray-200">
                      No health issues found
                    </div>
                  }
                  {chatSessions?.map((chatSession: any, index: number) => (
                  
                  
                  <div 
                    key={chatSession.id || index}
                    className="grid grid-cols-1 gap-4 m-2"
                  >
                    <div className=" bg-gray-700 p-4 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-notebook-tabs"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M15 2v20"/><path d="M15 7h5"/><path d="M15 12h5"/><path d="M15 17h5"/></svg>                      <div>
                        <h3 className="text-lg font-semibold"><ConvertToEasternTime utcDateString={chatSession?.createdAt?.toString()} ></ConvertToEasternTime></h3>
                        <p className="text-sm text-gray-500">Symptoms: {chatSession?.symptoms || 'No symptoms'}</p>
                      </div>
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