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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img src="/logo.png" alt="logo" className="mx-auto w-24" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Coming Soon!</h2>
              <Link href="/register" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Get Started</Link>
            </div>
        </div>
      </main>
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
