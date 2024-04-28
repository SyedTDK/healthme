//Landing page and home page for the application
"use client";
import Link from "next/link";
import Profile from "@/app/components/Profile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

//Decodes the current session data and use prisma to retrieve the current user in the database. This function can be copied to reuse in other parts of the application.
// const getCurrentUser = async () => {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) return;
//     const currentUser = await prisma.user.findUnique({
//       where: { email: session.user.email }
//     });
//     if (!currentUser) return;
//     return currentUser;
//   } catch (e: any) {
//     // simply ignores if no user is logged in
//     return;
//   }
//};


export default async function Home() {
  // const user = await getCurrentUser();
  // if(user) {
  //   var firstName = user.name?.replace(/ .*/,'');
  // }
  const session = await getSession();
  if(session) {
    window.location.href = "/chat/new";
  }


    // If no user is logged in, display the landing page
    return (
      <>
        <header>
          <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                  <a href="/" className="flex items-center">
                      <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">HealthMe</span>
                  </a>
                  <div className="flex items-center">
                    <a href="/login" className="px-4 py-1.5 mr-2 text-sm font-medium leading-6 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-800">Login</a>
                    <a href="/register" className="px-4 py-1.5 text-sm font-medium leading-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-md hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">Register</a>
                  </div>
              </div>
            </nav>
        </header>
        <main className="flex items-center justify-center px-4 mx-auto max-w-screen-xl min-h-screen text-center lg:px-12">
          <div className="w-full">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">Your Personal <span className="font-bold fade-in-text bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Health Assistant.</span></h1>
            <p className="mb-8 text-lg font-normal  lg:text-xl sm:px-16 xl:px-48 text-gray-400">AI Expertise, Seamless Health Data Tracking, and Doctor Search</p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-indigo-600 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                    Get Started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
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
  // else {
  //   // If a user is logged in, display the home page
  //   return (
  //     <>
  //       <header>
  //           <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
  //             <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
  //                 <Link href="/" className="flex items-center">
  //                     <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
  //                     <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HealthMe</span>
  //                 </Link>
  //                 <div className="flex items-center">
  //                   <Profile user={user} />
  //                 </div>
  //             </div>
  //           </nav>
  //       </header>
  //       <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //         <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  //             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  //               <h2 className="mt-0 pb-3 inline-flex text-center text-3xl md:text-6xl font-medium leading-tight sm:leading-tight lg:leading-relaxed tracking-tight text-white">Hello,<span className="fade-in-text ml-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"> {firstName}</span></h2>
  //               <a href="/chat" className="block max-w-sm p-6 mt-2 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
  //                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Chat with AI</h5>
  //                 <p className="font-normal text-gray-400">Ask anything about your personal health!</p>
  //               </a>
  //               <a href="#" className="block max-w-sm p-6 mt-4 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
  //                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Health Analytics</h5>
  //                 <p className="font-normal text-gray-400">Keep track of your health data.</p>
  //               </a>
  //               <a href="/search" className="block max-w-sm p-6 mt-4 border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
  //                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Find a Doctor</h5>
  //                 <p className="font-normal text-gray-400">Find doctors and specialists near you.</p>
  //               </a>
  //             </div>
  //         </div>
  //       </main>
  //       <footer>
  //         <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
  //           <div className="sm:flex sm:items-center sm:justify-between">
  //               <span className="text-sm sm:text-center text-gray-400">© 2024 HealthMe™. All Rights Reserved.
  //               </span>
  //           </div>
  //         </div>
  //       </footer>
  //     </>
  //   );

  // }