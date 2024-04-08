// page.tsx

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from "next-auth/react";
import { Message, PatientInfo } from '../../../../types/types';
import { BotResponseType, BotMessages } from './BotMessages';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState<BotResponseType>(BotResponseType.WELCOME);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    isPatient: null,
    name: '',
    age: '',
    gender: '',
    symptoms: [],
  });
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
    fetchMessages();
  }, []);

  useEffect(() => {
    const welcomeMessage = BotMessages[BotResponseType.WELCOME][Math.floor(Math.random() * BotMessages[BotResponseType.WELCOME].length)];
    const patientWhoMessage = BotMessages[BotResponseType.PATIENT_WHO][Math.floor(Math.random() * BotMessages[BotResponseType.PATIENT_WHO].length)];

    setMessages([
      { text: welcomeMessage, isUser: false },
      { text: patientWhoMessage, isUser: false }
    ]);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://healthme-test-1868220c15ef.herokuapp.com/chatbot');
      const chatbotMessages = response.data.messages.map((message: string) => ({ text: message, isUser: false }));
      setMessages(chatbotMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

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
          if (patientInfo.symptoms.length >= 2) {
            nextStep = BotResponseType.DISEASE;
          }
        }
        break;
        case BotResponseType.DISEASE:
        // POST request to send the user's message to the chatbot API
        try {
          const response = await axios.post('https://healthme-test-1868220c15ef.herokuapp.com/chatbot', { message: userInput });
          const botResponse = response.data.response;
          setMessages(prevMessages => [...prevMessages, { text: botResponse, isUser: false }]);
        } catch (error) {
          console.error('Error sending message:', error);
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
          >
            <option value="">Select a symptom</option>
            {symptomOptions.map((symptom, index) => (
              <option key={index} value={symptom}>
                {symptom.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          <button onClick={() => sendMessage(newMessage)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2">Add Symptom</button>
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

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="flex flex-col flex-grow justify-between py-10 h-screen bg-black text-white ml-3">
        <div className="flex items-center justify-between px-6 mb-5">
          <h1 className="text-3xl font-bold">HealthME</h1>
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default App;
