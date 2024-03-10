import React from 'react'
import NewChat from './NewChat'
import { UserCircleIcon } from '@heroicons/react/24/solid'

function SideBar() {
  return (
    <div className = "p-2 flex flex-col h-screen">
        <div className= "flex-1"> 
        <div>
            {/* {newchat} */}
            <NewChat />
           

            {/* The chat history goes here. */}
        </div>
        </div>

        <div className="border-gray-700 border chatRow">
        <UserCircleIcon className =  "h-8 w-8"/>
        <p>Fardeen Ahmed</p>
    </div>
    
    </div>
    
    
  )
}

export default SideBar