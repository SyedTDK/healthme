//This page will display all the allergies and option to add new new allergy.
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import AddAllergy from "../../components/AddAllergy";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, Pill, ClipboardList, ShieldBan } from "lucide-react";
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

  const getAllergies = async (user: any) => {
    try {
      const allergies = await prisma.allergies.findMany({
        where: { userId: { equals: user?.id ?? undefined } },
        orderBy: { createdAt: 'desc' }
      });
      return allergies;
    } catch (error) {
      console.error('Error fetching allergies:', error);
    }
  }

  

export default async function New() {
    const user = await getCurrentUser();
    if (!(user)) {
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
        const allergies = await getAllergies(user);
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
          <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </Link>
          <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={true} /> </Link>
        </Sidebar>
          {/* <!-- Header --> */}
          <div className="w-full ml-4 mr-4">
          <AddAllergy />
          <div className="items-center mb-1">
            <h2 className="text-2xl font-semibold">Allergies</h2>
          </div>
          <div className="items-center mb-3">
            <h2 className="text-xs text-gray-500">Refresh the page to update the list.</h2>
          </div>
 
          {/* <!-- Items --> */}
          <div className="space-y-4">
            {/* <!-- Single Item --> */}
           {allergies?.length === 0 && 
             <p className="text-center text-gray-500">No allergies added yet.</p>}
           {allergies?.map((allergy: any, index: number) => (
 
            <div 
             key={allergy.id || index}
             className="flex items-center bg-gray-900 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
            >
              <div className="p-2 ml-2 rounded-2xl bg-gray-800 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-wheat-off"><path d="m2 22 10-10"/><path d="m16 8-1.17 1.17"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"/><path d="M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"/><path d="M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"/><line x1="2" x2="22" y1="2" y2="22"/></svg>              </div>
              <div className="flex-grow p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{allergy?.name}</h3>
                  <div className="flex">
                    <span className="mr-2">Type: {allergy?.type}</span>
                      <span className="mr-2">Name: {allergy?.name}</span>
                      <span className="mr-2">Medications: {allergy?.medications}</span>
                      <span>Descriptions: {allergy?.description}</span>
                  </div>
                </div>
                <DeleteData dataId={allergy.id} type="allergy" />
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
