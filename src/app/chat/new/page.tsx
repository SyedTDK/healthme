// This is the chat page where the user can interact with the chatbot

"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from "next-auth/react";
import { Message, PatientInfo } from '../../../../types/types';
import { BotResponseType, BotMessages } from './BotMessages';
import Sidebar, { SidebarItem } from "@/app/components/Sidebar";
import { BotMessageSquare, LayoutDashboard, UserSearch, History, LogOut } from 'lucide-react';


const App: React.FC = () => {
    const { data: session, status } = useSession();

    const userName = session?.user?.name;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
   
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentStep, setCurrentStep] = useState<BotResponseType>(BotResponseType.WELCOME);
    const [patientInfo, setPatientInfo] = useState<PatientInfo>({
      isPatient: null,
      name: '',
      age: '',
      gender: '',
      symptoms: [],
    });

    const [detectDiseaseMode, setDetectDiseaseMode] = useState(false); // State variable to track the mode of the button
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

  
    useEffect(() => {
      const welcomeMessage = BotMessages[BotResponseType.WELCOME][Math.floor(Math.random() * BotMessages[BotResponseType.WELCOME].length)];
      const patientWhoMessage = BotMessages[BotResponseType.PATIENT_WHO][Math.floor(Math.random() * BotMessages[BotResponseType.PATIENT_WHO].length)];

      setMessages([
        { text: welcomeMessage, isUser: false },
        { text: patientWhoMessage, isUser: false }
      ]);
    }, []);

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

    const sendMessage = async (userInput: string) => {
      setMessages(prevMessages => [...prevMessages, { text: userInput, isUser: true }]);

      let nextStep = currentStep;
      switch (currentStep) {
        case BotResponseType.WELCOME:
          nextStep = BotResponseType.NAME;
          setPatientInfo(prev => ({ ...prev, isPatient: userInput.toLowerCase() === 'yes' }));
          break;
        case BotResponseType.NAME:
          setPatientInfo(prev => ({ ...prev, name: userInput }));
          nextStep = BotResponseType.GENDER;
          break;
        case BotResponseType.GENDER:
          setPatientInfo(prev => ({ ...prev, gender: userInput }));
          nextStep = BotResponseType.AGE;
          break;
        case BotResponseType.AGE:
          const isValidAge = /^[0-9]{1,3}$/.test(userInput.trim()) && parseInt(userInput.trim()) >= 0 && parseInt(userInput.trim()) <= 100;
          if (isValidAge) {
            setPatientInfo(prev => ({ ...prev, age: userInput }));
            nextStep = BotResponseType.SYMPTOM;
          } else {
            setMessages(prevMessages => [
              ...prevMessages,
              { text: "Please enter a valid age between 0 and 100.", isUser: false }
            ]);
          }
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
          case BotResponseType.DISEASE:
            // Construct the payload with the collected symptoms
            const payload = {
              symptoms: patientInfo.symptoms
            };
          
            // Use axios to send a POST request to your backend
            try {
              const response = await axios.post('https://api-production-b578.up.railway.app/chatbot', payload);
              // Assuming your API returns a response that includes a message or advice
              const apiResponse = response.data;
          


              // Assuming apiResponse includes a property 'message' that contains the diagnosis or advice
              // Update your messages state with this new message from the API
              setMessages(prevMessages => [...prevMessages, { text: apiResponse.message, isUser: false }]);

              
          
              // Here, you might also handle transitioning to another conversation step or concluding the interaction
            } catch (error) {
              console.error('Error receiving response from the API:', error);
              setMessages(prevMessages => [...prevMessages, { text: "Sorry, we couldn't process your request at the moment. Please try again later.", isUser: false }]);
            }
            break;
        default:
          console.log("Unhandled step");
      }

      setCurrentStep(nextStep);
      const botResponse = BotMessages[nextStep][Math.floor(Math.random() * BotMessages[nextStep].length)];
      setMessages(prevMessages => [...prevMessages, { text: botResponse, isUser: false }]);
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
      const diagnosis = messages[messages.length - 1].text;

      
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
        <main className='flex'>
        <Sidebar>
                <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={true} /></a>
                <a href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </a>
                <a href="/"><SidebarItem icon={<LayoutDashboard />} text="Dashboard" active={false} /> </a>
                <a href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </a>
        </Sidebar>
        <div className='flex-grow'>
          <div className="flex h-screen bg-black text-white">
            <div className="flex flex-col flex-grow justify-between h-screen bg-black text-white ml-3">
            
              <div className="flex flex-col h-screen justify-between">
                <div className="overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} mb-5`}>
                    <div className={`bg-blue-500 text-white rounded-lg p-2 max-w-xs`}>
                      {message.text}
                    </div>
                  </div>
                  ))}
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
      </main>
      )
    } else {

      return (
        <main className='flex'>
          <Sidebar>
                  <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={true} /></a>
                  <a href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={false} /> </a>
                  <a href="/"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </a>
                  <a href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </a>
          </Sidebar>
          <div className='flex-grow'>
            <div className="flex h-screen bg-black text-white">
              <div className="flex flex-col flex-grow justify-between h-screen bg-black text-white ml-3">
              
                <div className="flex flex-col h-screen justify-between">
                  <div className="overflow-y-auto">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} mb-5`}>
                      <div className={`bg-blue-500 text-white rounded-lg p-2 max-w-xs`}>
                        {message.text}
                      </div>
                    </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="flex items-center">
                    {renderInputArea()}
                  </div>            
              </div>
            </div>
          </div>
        </div>
        </main>
      );
    }
  
};

export default App;