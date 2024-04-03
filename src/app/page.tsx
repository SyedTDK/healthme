//Landing page for the application
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Profile from "@/app/components/Profile";

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
  if(user) {
    var firstName = user.name?.replace(/ .*/,'');
  }
  if (!user) {
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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 pb-3 text-center text-3xl md:text-6xl font-medium leading-9 tracking-tight text-white">Your Personal <span className="fade-in-text bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Health Assistant.</span> AI Expertise and Seamless Tracking.</h2>
                <Link href="/register" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-medium leading-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"> Get Started</Link>
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
  }
  else {
    return (
      <>
        <header>
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                  <Link href="/" className="flex items-center">
                      <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HealthMe</span>
                  </Link>
                  <div className="flex items-center">
                    <Profile user={user} />
                  </div>
              </div>
            </nav>
        </header>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-0 pb-3 inline-flex text-center text-3xl md:text-6xl font-medium leading-tight sm:leading-tight lg:leading-relaxed tracking-tight text-white">Hello,<span className="fade-in-text ml-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"> {firstName}</span></h2>
                <Link href="/chat" className="block max-w-sm p-6 mt-2 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Chat with AI</h5>
                  <p className="font-normal text-gray-400">Ask anything about your personal health!</p>
                </Link>
                <Link href="#" className="block max-w-sm p-6 mt-4 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Health Analytics</h5>
                  <p className="font-normal text-gray-400">Keep track of your health data.</p>
                </Link>
                <Link href="#" className="block max-w-sm p-6 mt-4 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Find a Doctor</h5>
                  <p className="font-normal text-gray-400">Find doctors and specialists near you.</p>
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
  }
}
