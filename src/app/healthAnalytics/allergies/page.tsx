//This page will display all the allergies and option to add new new allergy.
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import AddAllergy from "../../components/AddAllergy";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, LogOut, Pill } from "lucide-react";
import ConvertToEasternTime from "../../components/ConvertToEasternTime";

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
                        <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white">Welcome to HealthMe</h1>
                        <p className="text-lg text-center text-gray-600 dark:text-gray-300">Please login or register to access the application.</p>
                    </section>
                </main>
            </>
        );
    } else {
        const allergies = await getAllergies(user);
        <main className="flex">
          <Sidebar>
                  <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
                  <a href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </a>
                  <a href="#"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </a>
                  <a href="/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </a>

                  <a href="/chat"><SidebarItem icon={<History />} text="Chat History" active={true} /> </a>
          </Sidebar>
          <div className="flex-1">
            <div className="p-4">
              <h1 className="text-3xl font-semibold text-white">Allergies</h1>
              <div className="mt-4">
                <AddAllergy/>
              </div>
              <div className="mt-4">
                {allergies?.length === 0 &&
                      <p className="text-gray-400">No past chat sessions found.</p>}
                    {allergies?.map((allergy: any, index: number) => (
                      <div 
                        key={allergy.id || index} 
                        className="flex items-center justify-between py-4"
                        >
                        <div>
                          <p className="text-lg font-semibold text-white">{allergy.name}</p>
                          <p className="text-sm text-gray-400">{allergy.type}</p>
                          <p className="text-sm text-gray-400">{allergy.description}</p>
                          <p className="text-sm text-gray-400">Medications: {allergy.medications}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400"><ConvertToEasternTime utcDateString={allergy.createdAt}></ConvertToEasternTime></p>
                        </div>

                        </div>
                    ))}
                </div>
            </div>
            </div>
        </main>
    }
}
