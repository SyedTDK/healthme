"use client";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { useSession } from "next-auth/react"

const SidebarContext = createContext({ expanded: true })

export default function Sidebar({ children }: { children: React.ReactNode[] }) {
    const { data: session, status } = useSession();
    const userName = session?.user?.name;
    const userEmail = session?.user?.email;
    const [expanded, setExpanded] = useState(true)
  
    return (
      <aside className={`transition-all ${expanded ? "w-64" : "w-20"}`}>
        <nav className="h-screen flex flex-col bg-[#1E1C1C] shadow-sm rounded-lg">
          <div className="p-4 pb-2 inline-flex justify-between items-center">
            {/* <img
                src="/logo.png"
                className={`overflow-hidden transition-all ${
                expanded ? "w-20" : "w-0"
                }`}
                alt=""
            /> */}
            <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg bg-black hover:bg-gray-800"
            >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          {/* <div className="border-t flex p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user w-10 h-10 rounded-md"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div
                className={`
                flex justify-between items-center
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
            >
                <div className="leading-4">
                  <h4 className="font-semibold">{userName}</h4>
                  <span className="text-xs text-gray-600">{userEmail}</span>
                </div>
            </div>
          </div> */}
        </nav>
      </aside>
    )
}

export function SidebarItem({ icon, text, active}: { icon: React.ReactNode, text: string, active: boolean}) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 mb-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-gray-800 text-gray-100"
        }
    `}
    >
      <div className="w-6 h-6">
      {icon}
      </div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}