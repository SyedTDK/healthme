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


const App: React.FC = () => {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    isPatient: false, // Example value, adjust as needed
    name: "",         // Example value, adjust as needed
    age: "",           // Example value, adjust as needed
    gender: "",       // Example value, adjust as needed
    symptoms: [],
  }); // Define patientInfo state
  const [currentStep, setCurrentStep] = useState<BotResponseType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]); // Simplified message type
  const [newMessage, setNewMessage] = useState('');
  const [detectDiseaseMode, setDetectDiseaseMode] = useState(false);
  const [symptomOptions] = useState<string[]>(['itching', 'skin rash', 'nodal skin eruptions', 'continuous sneezing',
    'shivering', 'chills', 'joint pain', 'stomach pain', 'acidity',
    'ulcers on tongue', 'muscle wasting', 'vomiting', 'burning micturition',
    'spotting urination', 'fatigue', 'weight gain', 'anxiety',
    'cold hands and feet', 'mood swings', 'weight loss', 'restlessness',
    'lethargy', 'patches in throat', 'irregular sugar level', 'cough',
    'high fever', 'sunken eyes', 'breathlessness', 'sweating',
    'dehydration', 'indigestion', 'headache', 'yellowish skin',
    'dark urine', 'nausea', 'loss of appetite', 'pain behind the eyes',
    'back pain', 'constipation', 'abdominal pain', 'diarrhea',
    'mild fever', 'yellow urine', 'yellowing of eyes',
    'acute liver failure', 'fluid overload', 'swelling of stomach',
    'swollen lymph nodes', 'malaise', 'blurred and distorted vision',
    'phlegm', 'throat irritation', 'redness of eyes', 'sinus pressure',
    'runny nose', 'congestion', 'chest pain', 'weakness in limbs',
    'fast heart rate', 'pain during bowel movements', 'pain in anal region',
    'bloody stool', 'irritation in anus', 'neck pain', 'dizziness',
    'cramps', 'bruising', 'obesity', 'swollen legs',
    'swollen blood vessels', 'puffy face and eyes', 'enlarged thyroid',
    'brittle nails', 'swollen extremities', 'excessive hunger',
    'extra marital contacts', 'drying and tingling lips', 'slurred speech',
    'knee pain', 'hip joint pain', 'muscle weakness', 'stiff neck',
    'swelling joints', 'movement stiffness', 'spinning movements',
    'loss of balance', 'unsteadiness', 'weakness of one body side',
    'loss of smell', 'bladder discomfort', 'foul smell of urine',
    'continuous feel of urine', 'passage of gases', 'internal itching',
    'toxic look (typhos)', 'depression', 'irritability', 'muscle pain',
    'altered sensorium', 'red spots over body', 'belly pain',
    'abnormal menstruation', 'discolored patches', 'watering from eyes',
    'increased appetite', 'polyuria', 'family history', 'mucoid sputum',
    'rusty sputum', 'lack of concentration', 'visual disturbances',
    'receiving blood transfusion', 'receiving unsterile injections', 'coma',
    'stomach bleeding', 'distention of abdomen',
    'history of alcohol consumption', 'fluid overload.1', 'blood in sputum',
    'prominent veins on calf', 'palpitations', 'painful walking',
    'pus-filled pimples', 'blackheads', 'scarring', 'skin peeling',
    'silver-like dusting', 'small dents in nails', 'inflammatory nails',
    'blister', 'red sore around nose', 'yellow crust ooze']);

    const [medicineOptions] = useState<string[]>(['tylenol', 'nyquil']); 

  
    useEffect(() => {
      if (userName) {
        const welcomeMessage = `Hello, ${userName}! Would you like to talk about symptoms or medicines?`;
        setMessages([{ text: welcomeMessage, isUser: false }]);
        setCurrentStep(null); // Set currentStep to null to trigger rendering of user options
      }
    }, [userName]);
    
    

    useEffect(() => {
      // Check if the number of selected symptoms is three or more
      if (patientInfo.symptoms.length >= 3) {
        setDetectDiseaseMode(true); // Enable "Detect Disease" mode
      } else {
        setDetectDiseaseMode(false); // Disable "Detect Disease" mode
      }
    }, [patientInfo.symptoms]); // Re-run effect when symptoms change

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    const handleUserOptionSelection = (isEnteringSymptoms: boolean) => {
      if (isEnteringSymptoms) {
          setCurrentStep(BotResponseType.SYMPTOM);
      } else {
          setCurrentStep(BotResponseType.MEDICINE); // Set current step to medicine
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
          if (patientInfo.symptoms.includes(userInput)) {
            setMessages(prevMessages => [
              ...prevMessages,
              { text: `The symptom "${userInput}" has already been added. Please select a different one.`, isUser: false }
            ]);
          } else {
            setPatientInfo(prev => ({ ...prev, symptoms: [...prev.symptoms, userInput] }));
            setMessages(prevMessages => [...prevMessages, { text: `The symptom "${userInput}" has been added.`, isUser: false }]);
            if (patientInfo.symptoms.length >= 3) {
              setDetectDiseaseMode(true); // Enable "Detect Disease" mode
            }
            if (patientInfo.symptoms.length >= 3) {
              nextStep = BotResponseType.DISEASE;
            }
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
            const message = matches.map((match: Match) => `${match.medicine}:\n\nUses - ${match.Uses}\n\nSide Effects - ${match['Side Effects']}`).join('\n\n');
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
    break;



          


        default:
          console.log("Unhandled step");
      }

      if (nextStep) {
        setCurrentStep(nextStep);
        const botResponse = BotMessages[nextStep][Math.floor(Math.random() * BotMessages[nextStep].length)];
        setMessages(prevMessages => [...prevMessages, { text: botResponse, isUser: false }]);
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
                  <select
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      className="flex-grow bg-gray-800 rounded-lg text-white p-3 shadow-md"
                      disabled={detectDiseaseMode} // Disable the select when in "Detect Disease" mode
                  >
                      <option value="">Select a symptom</option>
                      {symptomOptions.map((symptom, index) => (
                          <option key={index} value={symptom}>
                              {symptom.replace(/_/g, ' ')}
                          </option>
                      ))}
                  </select>
                  <button
                      onClick={async () => {
                          if (detectDiseaseMode) {
                              setCurrentStep(BotResponseType.DISEASE); // Change the conversation step
  
                              // Call the API to detect the disease
                              try {
                                  const response = await axios.post('https://api-production-b578.up.railway.app/chatbot', { symptoms: patientInfo.symptoms });
                                  const apiResponse = response.data;
  
                                  // Update messages with the response from the API
                                  setMessages(prevMessages => [...prevMessages, { text: apiResponse.message, isUser: false }]);
                              } catch (error) {
                                  console.error('Error receiving response from the API:', error);
                                  setMessages(prevMessages => [...prevMessages, { text: "Sorry, we couldn't process your request at the moment. Please try again later.", isUser: false }]);
                              }
                          } else {
                              sendMessage(newMessage); // Adding a symptom
                          }
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
                  >
                      {detectDiseaseMode ? 'Detect Disease' : 'Add Symptom'}
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
      const symptoms = patientInfo.symptoms;
      //Extract the diagnosis as a string
      const diagnosis = messages.length > 0 ? messages[messages.length - 1].text : '';


      
      //Function for saving the symptoms and diagnosis to the database
      const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          const body = { userId, symptoms, diagnosis};
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
                    <div className="overflow-y-auto">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} mb-5`}>
                        <div className={`bg-blue-500 text-white rounded-lg p-2 max-w-xs`}>
                          {message.text}
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