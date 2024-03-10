"use client"

import React from 'react';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import TextareaAutosize from 'react-textarea-autosize';
import SideBar from '../components/SideBar';

const App: React.FC = () => {
  return (
    <div>
      <div className = "flex">
          <div className= "bg-[#202123] max-w-xs h-screen overflow-y-auto border-r border-black md:min-w-[20rem]"> 
            <SideBar/>
        </div>
    
    <div className = "flex flex-col items-center justify-high py-10 h-screen bg-black text-white flex-grow pl-1">  
    {/* {h-screen} */}
      <h1 className='text-5xl font-bold mb-20'>  HealthME </h1>

      <TextareaAutosize rows={1} 
placeholder='Type your questions'
className='w-full bg-gray-800 rounded-lg text-lg
 border-none focus:outline-none p-3 shadow-md text-white row-span-1'>
</TextareaAutosize>

    </div>
        
 </div>
 </div>
  );
}

export default App;
