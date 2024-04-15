import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Profile from "@/app/components/Profile";
import Search from "./Search";

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

export default async function Page() {
    const user = await getCurrentUser();
    return (
        <>
            <header>
                <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HealthMe</span>
                    </a>
                    <div className="flex items-center">
                        <Profile user={user} />
                    </div>
                </div>
                </nav>
            </header>
            <Search />
        </>
    )

}