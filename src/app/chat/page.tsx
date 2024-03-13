// Chat UI
"use client";
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import TextareaAutosize from 'react-textarea-autosize';
import SideBar from '../components/SideBar';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="bg-gray-100 max-w-xs h-screen overflow-y-auto border-r border-gray-200 md:min-w-[20rem]">
        <SideBar />
      </div>
      <div className="flex flex-col flex-grow justify-between py-10 h-screen bg-black text-white">
        <div className="flex items-center justify-between px-6">
          <h1 className="text-3xl font-bold">HealthME</h1>
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
        </div>
        <div className="flex flex-col flex-grow px-6">
          <div className="flex-grow overflow-y-auto">
            {/* Chat messages go here */}
            <div className="flex justify-end mb-2">
              <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">Hello, how can I help you?</div>
            </div>
            {/* More chat messages */}
          </div>
          <div className="flex items-center">
            <TextareaAutosize
              rows={1}
              placeholder="Message HealthME..."
              className="flex-grow bg-gray-800 rounded-lg text-white border-none focus:outline-none p-3 shadow-md text-white-800"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;