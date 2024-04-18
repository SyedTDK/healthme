// This is the chat page where the user can interact with the chatbot

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from "next-auth/react";
import { Message, PatientInfo } from '../../../../types/types';
import { BotResponseType, BotMessages } from './BotMessages';
import Profile from "@/app/components/Profile";
import Link from 'next/link';

const App: React.FC = () => {
    const { data: session, status } = useSession();

    const userName = session?.user?.name;
    const [submitMessage, setSubmitMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
   
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [newMessage, setNewMessage] = useState('');
    // const [currentStep, setCurrentStep] = useState<BotResponseType>(BotResponseType.WELCOME);
    const [currentStep, setCurrentStep] = useState<BotResponseType | null>(null);
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

  
  //   useEffect(() => {
  //     const welcomeMessage = BotMessages[BotResponseType.WELCOME][Math.floor(Math.random() * BotMessages[BotResponseType.WELCOME].length)];
  //     const patientWhoMessage = BotMessages[BotResponseType.PATIENT_WHO][Math.floor(Math.random() * BotMessages[BotResponseType.PATIENT_WHO].length)];
  
  //     setMessages([
  //         { text: welcomeMessage, isUser: false },
  //         { text: patientWhoMessage, isUser: false }
  //     ]);
  //     setCurrentStep(BotResponseType.PATIENT_WHO);  // Make sure the next step is set
  // }, []);

  useEffect(() => {
    // No initial messages, wait for user input
  }, []);

  const handleUserSelection = (isPatient: boolean) => {
    setPatientInfo({...patientInfo, isPatient: isPatient});

    if (isPatient) {
        // Use the session user's name if available, otherwise prompt for it
        const userNameFromSession = session?.user?.name || '';
        if (userNameFromSession) {
            setPatientInfo(prevInfo => ({
                ...prevInfo,
                name: userNameFromSession
            }));
            setCurrentStep(BotResponseType.GREET); // Move directly to greeting if name is present
            const greetingMessage = `Hi ${userNameFromSession}, how can we assist you today?`;
            setMessages([{ text: greetingMessage, isUser: false }]);
        } else {
            // If no username is available in session, ask for the name
            setCurrentStep(BotResponseType.NAME);
            setMessages([{ text: "Please enter your name:", isUser: false }]);
        }
    } else {
        // Move to the NAME step to manually enter the patient's name
        setCurrentStep(BotResponseType.NAME);
        setMessages([{ text: "Please enter the patient's name:", isUser: false }]);
    }
};


const renderUserOptions = () => {
  if (currentStep === null) {  // Only show these options initially
      const welcomeMessage = BotMessages[BotResponseType.WELCOME][Math.floor(Math.random() * BotMessages[BotResponseType.WELCOME].length)];
      return (
          <>
              <div className="text-white text-center p-4 text-lg">
                  {welcomeMessage}
              </div>
              <div className="flex justify-around p-4">
                  <button onClick={() => handleUserSelection(true)} 
                          className="bg-gray-800 hover:bg-gray-700 text-white text-lg py-4 px-8 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                      Are you the patient?
                  </button>
                  <button onClick={() => handleUserSelection(false)} 
                          className="bg-gray-800 hover:bg-gray-700 text-white text-lg py-4 px-8 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                      Are you someone else?
                  </button>
              </div>
          </>
      );
  }
  return null;
};
  

    useEffect(() => {
      // Check if the number of selected symptoms is three or more
      if (patientInfo.symptoms.length >= 3) {
        setDetectDiseaseMode(true); // Enable "Detect Disease" mode
      } else {
        setDetectDiseaseMode(false); // Disable "Detect Disease" mode
      }
    }, [patientInfo.symptoms]); // Re-run effect when symptoms change

    const sendMessage = async (userInput: string) => {
      setMessages(prevMessages => [...prevMessages, { text: userInput, isUser: true }]);

      let nextStep = currentStep;
      let nameUsedInGreeting = patientInfo.name; 

      switch (currentStep) {

        case BotResponseType.PATIENT_WHO:
          const isPatientUser = userInput.toLowerCase() === 'yes';
          setPatientInfo(prev => ({ ...prev, isPatient: isPatientUser }));
          nextStep = BotResponseType.NAME; // Proceed to get the patient's name
          break;

      case BotResponseType.NAME:
          setPatientInfo(prev => ({ ...prev, name: userInput }));
          nextStep = BotResponseType.GREET; // Transition to greeting the user by name
          nameUsedInGreeting = userInput;
          break;

      case BotResponseType.GREET:
            const greetingResponse = BotMessages[BotResponseType.GREET][Math.floor(Math.random() * BotMessages[BotResponseType.GREET].length)].replace("{name}", nameUsedInGreeting);
            const genderQuery = BotMessages[BotResponseType.GENDER][Math.floor(Math.random() * BotMessages[BotResponseType.GENDER].length)];
            // Automatically send the next gender-related message
            setMessages(prevMessages => [
                ...prevMessages,
                { text: greetingResponse, isUser: false },
                { text: genderQuery, isUser: false }
            ]);
            nextStep = BotResponseType.GENDER; // Set the next step but do not trigger another message
          break;
          
      case BotResponseType.GENDER:
            setPatientInfo(prev => ({ ...prev, gender: userInput }));
            nextStep = BotResponseType.AGE; // Move to AGE after GENDER
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
              const response = await axios.post('https://api-nts4.onrender.com/chatbot', payload);
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
    // Ensure to use the updated name for the greeting
    const botResponse = BotMessages[nextStep].map(message =>
        message.replace("{name}", nameUsedInGreeting) // Use the name from the latest input or state
    )[Math.floor(Math.random() * BotMessages[nextStep].length)];
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
                  const response = await axios.post('https://api-nts4.onrender.com/chatbot', { symptoms: patientInfo.symptoms });
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
      const diagnosis = messages.length > 0 ? messages[messages.length - 1].text : "";


      
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
        <>
        <header>
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HealthMe</span>
                    </Link>
                    <div className="flex items-center">
                        <Profile user={session.user} />
                    </div>
                </div>
            </nav>
        </header>
        <div className="flex h-screen bg-black text-white">
            <div className="flex flex-col flex-grow justify-between py-10 h-screen bg-black text-white ml-3">
                {renderUserOptions()}  {/* This is where the initial user options are displayed */}
                <div className="flex flex-col flex-grow px-6">
                    <div className="flex-grow overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} mb-5`}>
                                <div className={`bg-blue-500 text-white rounded-lg p-2 max-w-xs`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        {renderInputArea()}
                    </div>
                    {/* TODO: Two buttons need to be displayed. One will Find a doctor, another return dashboard */}
                    <button
                        onClick={submitData}
                        className="block mt-1 border bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] py-2 px-4 rounded-lg ml-2"
                    >
                        {isSubmitting && <p>Saving...</p>}
                        {!isSubmitting && <p>End Session and Find a Doctor</p>}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
    
    } else {

    // return (
    //   <div className="flex h-screen bg-black text-white">
    //     <div className="flex flex-col flex-grow justify-between py-10 h-screen bg-black text-white ml-3">
    //       <div className="flex items-center justify-between px-6 mb-5">
    //         <h1 className="text-3xl font-bold">HealthME</h1>
    //         <UserCircleIcon className="h-8 w-8 text-gray-500" />
    //       </div>
    //       <div className="flex flex-col flex-grow px-6">
    //         <div className="flex-grow overflow-y-auto">
    //           {messages.map((message, index) => (
    //             <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} mb-5`}>
    //               <div className={`bg-blue-500 text-white rounded-lg p-2 max-w-xs`}>
    //                 {message.text}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //         <div className="flex items-center">
    //           {renderInputArea()}
    //         </div>
            
    //       </div>
    //     </div>
    //   </div>
    // );
  }
  
};

export default App;