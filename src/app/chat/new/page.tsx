// This is the chat page where the user can interact with the chatbot
"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from "next-auth/react";
import { Message, PatientInfo } from '../../../../types/types';
import { BotResponseType, BotMessages } from './BotMessages';
import Sidebar, { SidebarItem } from "@/app/components/Sidebar";
import { BotMessageSquare, LayoutDashboard, UserSearch, History, LogOut, ClipboardList, Pill, ShieldBan } from 'lucide-react';
import Profile from '@/app/components/Profile';
import Link from 'next/link';
import { diseases } from './diseaseAdvice';


const App: React.FC = () => {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ isPatient: false, name: "", age: "", gender: "", symptoms: [], diagnosis: "" });
  const [currentStep, setCurrentStep] = useState<BotResponseType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentDiseaseInfo, setCurrentDiseaseInfo] = useState(null);


  
  
  useEffect(() => {
    if (userName) {
      const welcomeMessage = `Welcome, ${userName}. Would you like to talk about symptoms or medicines?`;
      setMessages([{ text: welcomeMessage, isUser: false }]);
      setCurrentStep(null);
    }
  }, [userName]);
    
    

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(scrollToBottom, [messages]);


    const handleUserOptionSelection = (isEnteringSymptoms: boolean) => {
      if (isEnteringSymptoms) {
        setCurrentStep(BotResponseType.SYMPTOM);
        // First message added immediately
        setMessages(prevMessages => [
          ...prevMessages,
          { text: `Hello, ${userName}! Sorry to hear you are feeling unwell.`, isUser: false }
        ]);
    
        // Second message after a delay
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: "Please describe how you are feeling today.", isUser: false }
          ]);
        }, 1500); // Delay in milliseconds, adjust as needed
      } else {
          setCurrentStep(BotResponseType.MEDICINE); // Set current step to medicine
          setMessages(prevMessages => [
            ...prevMessages,
            { text: `Hello, ${userName}! Please type a medication you would like to learn more about`, isUser: false },
          ]);
      }
  };
  
  

  const renderUserOptions = () => {
    if (currentStep === null) {  // Only show these options initially
        return (
            <>
                <div className="flex justify-around p-4">
                    <button 
                        onClick={() => handleUserOptionSelection(true)} 
                        className="bg-gray-800 hover:bg-gray-700 text-white text-lg py-4 px-8 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
                    >
                        Enter Symptoms
                    </button>
                    <button 
                        onClick={() => handleUserOptionSelection(false)} 
                        className="bg-gray-800 hover:bg-gray-700 text-white text-lg py-4 px-8 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
                    >
                        Learn about Medications
                    </button>
                </div>
            </>
        );
    }
    return null;
};


    const sendMessage = async (userInput: string) => {
      setMessages(prevMessages => [...prevMessages, { text: userInput, isUser: true }]);

      let nextStep = currentStep;
      switch (currentStep) {
        case BotResponseType.WELCOME:
          nextStep = userInput.toLowerCase() === 'symptoms' ? BotResponseType.SYMPTOM : BotResponseType.MEDICINE;
          break;

          case BotResponseType.SYMPTOM:
            try {
              const response = await axios.post('https://lstmmodelchatbot.ue.r.appspot.com/chatbot', { symptoms: userInput });
              const apiResponse = response.data;
              
              // Extract the disease name from the API response
              const diseaseName = apiResponse.disease; // Assuming 'disease' is the key where the name is stored
              const normalizedDiseaseName = diseaseName.toLowerCase();
              const diseaseInfo = diseases[normalizedDiseaseName];
              if (diseaseInfo) {
                setMessages(prevMessages => [
                  ...prevMessages,
                  { text: `${userName}, sorry to hear you are dealing with ${diseaseName}.`, isUser: false }
                ]);
              
                // Add a delay before adding the next text message
                setTimeout(() => {
                  setMessages(prevMessages => [
                    ...prevMessages,
                    { text: `To treat ${diseaseName}, consider the following advice: ${diseaseInfo.generalAdvice}`, isUser: false }
                  ]);
              
                  // Add a delay before adding the last text message
                  setTimeout(() => {
                    setMessages(prevMessages => [
                      ...prevMessages,
                      { text: `OTC Medication: ${diseaseInfo.otcMedication}`, isUser: false }
                    ]);
                  }, 2000);
                }, 2500);
              }
               else {
                setMessages(prevMessages => [
                  ...prevMessages,
                  { text: "We could not find any information on this disease. Please consult a doctor for more information.", isUser: false }
                ]);
              }
        
            } catch (error) {
              console.error('Error receiving response from the API:', error);
              setMessages(prevMessages => [
                ...prevMessages,
                { text: "Sorry, we couldn't process your request at the moment. Please try again later.", isUser: false }
              ]);
            }
            break;
          
            case BotResponseType.MEDICINE:
              if (!userInput.trim()) {
                setMessages(prevMessages => [
                  ...prevMessages,
                  { text: "Please enter a medication you would like to learn about.", isUser: false }
                ]);
                break;
              }
        
              // Add a delay before processing the medicine API call
              setTimeout(async () => {
                try {
                    const response = await axios.post('https://medicine-production-8a43.up.railway.app/medicine', { medicine: userInput });
                    const apiResponse = response.data;
            
                    if (response.status === 200) {
                        // If the API response indicates success, display medication info
                        const { matches } = apiResponse;
            
                        // Define the Match interface here
                        interface Match {
                            medicine: string;
                            Uses: string;
                            'Side Effects': string;
                        }
            
                        // Map over matches with the Match interface
                        const message = matches.map((match: Match) =>
                            `${match.medicine}:\n\nUses - ${match.Uses}\n\nSide Effects - ${match['Side Effects']}`
                        ).join('\n\n');
                        setMessages(prevMessages => [...prevMessages, { text: message, isUser: false }]);
                    } else {
                        // If the API response indicates failure, display a message to the user
                        setMessages(prevMessages => [...prevMessages, { text: "Medication information is not available. Please enter another medication.", isUser: false }]);
                    }
                } catch (error) {
                    // If there's an error fetching the response, display an error message
                    console.error('Error receiving response from the API:', error);
                    setMessages(prevMessages => [...prevMessages, { text: "Sorry, we couldn't process your request at the moment. Please try again later.", isUser: false }]);
                }
            }, 1500);
             // Add a delay of 1500ms before processing the medicine API call
              break;
        
            default:
              console.log("Unhandled step");
          }
        };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage(newMessage);
        setNewMessage('');
      }
    };

    const renderInputArea = () => {
      if (currentStep === BotResponseType.SYMPTOM) {
        return (
          <>
            <TextareaAutosize
              rows={1}
              placeholder="Enter your symptoms here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow bg-gray-800 rounded-lg text-white border-none focus:outline-none p-3 shadow-md"
            />
            <button
              onClick={() => {
                sendMessage(newMessage);
                setNewMessage(''); // Resetting the message string
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
            >
              Enter
            </button>
          </>
        );
      } else if (currentStep === BotResponseType.MEDICINE) {
        return (
          <>
            <TextareaAutosize
              rows={1}
              placeholder="Please enter a medication you would like to learn about."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow bg-gray-800 rounded-lg text-white border-none focus:outline-none p-3 shadow-md"
            />
            <button
              onClick={() => sendMessage(newMessage)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
            >
              Submit
            </button>
          </>
        );
      } else {
        return (
          <TextareaAutosize
            rows={1}
            placeholder="Message HealthME..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow bg-gray-800 rounded-lg text-white border-none focus:outline-none p-3 shadow-md"
          />
        );
      }
    };
    
    
  
    
    
    if (status === "authenticated") {
      const userId = parseInt(session?.user?.id || '0');
      //Extract the symptoms as a string[]
      // const symptoms = patientInfo.symptoms;
      // //Extract the diagnosis as a string
      
      const diagnosis = messages.length >= 3 ? messages.slice(-3).map(msg => msg.text).join(' ') : '';
      const symptoms = messages.length >= 4 ? messages[messages.length - 4].text : '';
      const disease = messages.length >= 3 ? messages[messages.length - 3].text.replace(/\.$/, '').split(/\s+/).slice(9).join(' ') : '';



      
      //Function for saving the symptoms and diagnosis to the database
      const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          const body = { userId, symptoms, diagnosis, disease};
          await fetch('/api/saveSession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
          //Redirect to the doctor search page using react router
          window.location.href = '/search';
        }
      };

      //Display the chat interface
      return (
        <main className="h-screen">
          <Profile user={session.user}/>
          <div className='flex'>
            <Sidebar>
              <Link href="/healthAnalytics"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </Link>
              <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={true} /></a>
              <Link href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </Link>
              <Link href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </Link>
              <Link href="/healthAnalytics/vitals"><SidebarItem icon={<ClipboardList />} text="Logbook" active={false} /> </Link>
              <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </Link>
              <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={false} /> </Link>
            </Sidebar>
            <div className='flex-grow'>
              <div className="flex h-screen text-white">
                <div className="flex flex-col flex-grow justify-between h-screen text-white ml-3">
                
                  <div className="flex flex-col h-screen justify-between">
                  <div className="overflow-y-auto flex-grow">
                      {messages.map((message, index) => (
                        <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} mb-5 mt-5`}>
                          <div className="relative overflow-hidden bg-blue-500 text-white rounded-lg p-2 max-w-md md:max-w-lg lg:max-w-xl">
                            <span className="inline-block animate-typewriter">
                              {message.text}
                            </span>
                            <span className="absolute right-0 top-0 h-full w-0.5 bg-black animate-blink"></span>
                          </div>
                        </div>
                      ))}
                      {renderUserOptions()}
                      <div ref={messagesEndRef} />
</div>

                    <div className='flex items-center'>
                      {renderInputArea()}        
                      <button
                        onClick={submitData}
                        className="mt-1 border bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] py-2 px-4 rounded-lg ml-2"
                      >
                        {isSubmitting && <p>Saving...</p>}
                        {!isSubmitting && <p>End Session and Find a Doctor</p>}
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      )
    } else {

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
        <main>
            <section className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-bold text-center text-white">Welcome to HealthMe</h1>
                <p className="text-lg text-center text-gray-300">Please login or register to access the application.</p>
            </section>
        </main>
        <footer>
            <div className="flex flex-col items-center justify-center py-4 text-sm text-gray-300">
                <p>© 2024 HealthMe. All rights reserved.</p>
                <p className="mt-2">Made with ❤️ by Team HealthMe</p>
            </div>
        </footer>
      </>
      );
    }
  
};

export default App;