// Chat UI
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from "next-auth/react"; // Import useSession hook

const App: React.FC = () => {
  // Initialize State for Messages
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { data: session, status } = useSession(); // Use useSession hook

  useEffect(() => {
    // Fetch Messages from Backend
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Make a GET request to fetch messages from the backend
      const response = await axios.get('https://healthme-test-1868220c15ef.herokuapp.com/chatbot');
      const chatbotMessages = response.data.messages.map((message: string) => ({ text: message, isUser: false }));
      setMessages(chatbotMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // Make a POST request to send the user's message to the chatbot API
      const response = await axios.post('https://healthme-test-1868220c15ef.herokuapp.com/chatbot', { message: newMessage });

      // Extract the bot's response from the API response
      const botResponse = response.data.response;

      // Update the state with the bot's response
      setMessages([...messages, newMessage, botResponse]);

      // Clear the input field after sending the message
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter key is pressed (key code 13)
    if (event.key === 'Enter') {
      // Prevent default behavior of Enter key (e.g., new line)
      event.preventDefault();
      // Send the message
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="flex flex-col flex-grow justify-between py-10 h-screen bg-black text-white">
        <div className="flex items-center justify-between px-6">
          <h1 className="text-3xl font-bold">HealthME</h1>
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
        </div>
        <div className="flex flex-col flex-grow px-6">
          <div className="flex-grow overflow-y-auto">
            {/* Display Messages */}
            {messages.map((message, index) => (
              <div key={index} className="flex justify-end mb-2">
                <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">{message}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <TextareaAutosize
              rows={1}
              placeholder="Message HealthME..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Add key press event listener
              className="flex-grow bg-gray-800 rounded-lg text-white border-none focus:outline-none p-3 shadow-md text-white-800"
            />
            <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
