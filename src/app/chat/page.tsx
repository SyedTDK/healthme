//This page will provide the users options to either create a new chat session or view summeries past chat sessions.

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, LogOut, ClipboardList, Pill, ShieldBan } from "lucide-react";
import ConvertToEasternTime from "../components/ConvertToEasternTime";
import Profile from "../components/Profile";
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

// Fetch chat sessions for the current user
const getChatSessions = async (user: any) => {
  try {
    const chatSessions = await prisma.chatSession.findMany({
      where: { userId: { equals: user?.id ?? undefined } },
      select: { id: true, createdAt: true, symptoms: true, diagnosis: true},
      orderBy: { createdAt: 'desc' }
    });
    return chatSessions;
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
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
    const ChatSessions = await getChatSessions(user);
    return (
        <>
        <Profile user={user} />
        <main className="flex">
          <Sidebar>
            <Link href="/healthAnalytics"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </Link>
            <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
            <Link href="/chat"><SidebarItem icon={<History />} text="Chat History" active={true} /> </Link>
            <Link href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </Link>
            <Link href="/healthAnalytics/vitals"><SidebarItem icon={<ClipboardList />} text="Logbook" active={false} /> </Link>
            <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </Link>
            <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={false} /> </Link>
          </Sidebar>
          <div className="flex-grow">
            <div className="flex h-screen text-white">
              <div className="flex flex-col flex-grow justify-between h-screen text-white ml-3">
                <div className="flex flex-col h-screen justify-between">
                  <div className="overflow-y-auto mx-auto max-w-screen-md">
                    <a href="/chat/new" className="block max-w-sm p-6 mt-2 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>New Chat Session</h5>
                    </a>
                    {/* Header of past session*/}
                    <h2 className="mt-8 mb-4 text-3xl font-bold tracking-tight text-white">Past Chat Sessions</h2>
                    {/*Display past session information with the creation date as its title sorted by the most recent. Under the title, it should display the symptoms and possible diagnosis by AI*/}

                    {ChatSessions?.length === 0 &&
                      <p className="text-gray-400">No past chat sessions found.</p>}
                    {ChatSessions?.map((ChatSession: any, index: number) => (
                      <div 
                        key={ChatSession.id || index} 
                        className="block max-w-sm p-6 mt-4 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700"
                      >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white"><ConvertToEasternTime utcDateString={ChatSession.createdAt?.toString()} ></ConvertToEasternTime> </h5>
                        <p className="font-normal text-gray-400">Symptoms experienced: {ChatSession.symptoms || 'No symptoms'}</p>
                        <p className="font-normal text-gray-400">Diagnosis by <span className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">AI</span>: {ChatSession.diagnosis || 'No diagnosis'}</p>
                        <DeleteData dataId={ChatSession?.id} type="chatSession" />
                      </div>
                      
                      /*Display a small delete button on the top right corner of each past chat session. When clicked, it should delete the chat session from the database.*/
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        </>
    );
  }
}