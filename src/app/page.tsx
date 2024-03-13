//Landing page for the application
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import LogoutButton from "./components/LogoutButton";

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


export default async function Home() {
  const user = await getCurrentUser();
  
  if (!user) {
    return (
      <>
        <header>
          <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                  <a href="/" className="flex items-center">
                      <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">HealthMe</span>
                  </a>
              </div>
            </nav>
        </header>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 pb-3 text-center text-3xl md:text-6xl font-medium leading-9 tracking-tight text-white">Your Personal <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Health Assistant.</span> AI Expertise and Seamless Tracking.</h2>
                <Link href="/register" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-medium leading-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"> Get Started</Link>
              </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm sm:text-center text-gray-400">© 2023 HealthMe™. All Rights Reserved.
                </span>
            </div>
          </div>
        </footer>
      </>
    );
  }
  else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img src="/logo.png" alt="logo" className="mx-auto w-24" />
              
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Coming Soon!</h2>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Welcome {user.name}</h2>
              <LogoutButton />
            </div>
        </div>
      </main>
    );
  }
}
