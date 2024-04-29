export enum BotResponseType {
    WELCOME = "WELCOME",
    NAME = "NAME",
    GENDER = "GENDER",
    PATIENT_WHO = "PATIENT_WHO",
    AGE = "AGE",
    SYMPTOM = "SYMPTOM",
    MORE_SYMPTOM = "MORE_SYMPTOM",
    DISEASE = "DISEASE",
    MEDICINE = "MEDICINE"

}

export const BotMessages: Record<BotResponseType, string[]> = {
    [BotResponseType.WELCOME]: [
        "Welcome! I'm here to assist you with disease detection.",
        "Hello there! I'm your virtual assistant for disease detection.",
        "Greetings! Let's work together to assess your symptoms.",
        "Hi! I'm here to help you understand your health better.",
        "Good day! I'm ready to assist you in identifying potential health concerns.",
        "Welcome aboard! Let's start by discussing your health.",
        "Hello! I'm here to provide support in understanding your symptoms.",
        "Greetings! Let's begin by talking about how you're feeling.",
        "Hi there! I'm your personal health assistant. How can I assist you today?",
        "Welcome! Let's work together to evaluate any health issues you may have."
    ],
    [BotResponseType.NAME]: [
        "Thank you. Could you please provide the name of the patient?",
        "Got it. What's the name of the patient?",
        "Noted. May I know the name of the patient?",
        "Understood. Could you please share the name of the patient?",
        "Great. What is the name of the patient?",
        "Acknowledged. Can you provide the name of the patient?",
        "Gotcha. Could you kindly share the name of the patient?",
        "Thanks for sharing. What's the name of the patient?",
        "Appreciate it. Before we proceed, could you provide the name of the patient?",
        "Perfect. Let's start by knowing the name of the patient."
    ],
    [BotResponseType.GENDER]: [
        "What is the gender of the patient?",
        "Could you tell me the gender of the patient?",
        "Is the patient male, female, or other?",
        "What gender does the patient identify with?",
        "Could you provide the gender of the patient?",
        "Is the patient a male, female, or other?",
        "Could you kindly share the gender of the patient?",
        "Please specify the gender of the patient.",
        "In terms of gender, is the patient male, female, or other?"
    ],
    [BotResponseType.PATIENT_WHO]: [
        "Is the patient you?",
        "Are we discussing your symptoms or the symptoms of another person?",
        "Are we evaluating your health or someone else's?",
        "Should I assess your symptoms or those of someone else?",
        "Are we talking about your health or someone else's?",
        "Is it your health we're discussing or someone else's?",
        "Should I consider your symptoms or those of someone else?",
        "Are we discussing your condition or someone else's?",
        "Whose symptoms are we evaluating, yours or someone else's?",
        "Should I focus on your symptoms or those of someone else?"
    ],
    [BotResponseType.AGE]: [
        "How old is the patient?",
        "Can you tell me the age of the patient?",
        "What is the age of the patient?",
        "May I know the age of the patient?",
        "How many years has the patient been alive?",
        "Could you provide me with the age of the patient?",
        "Could you kindly share the age of the patient?"
    ],
    [BotResponseType.SYMPTOM]: [
        "What symptoms are you experiencing?",
        "Could you tell me more about the symptoms?",
        "Describe the symptoms you are feeling.",
        "What specific symptoms are troubling you?",
        "What symptoms have you been experiencing lately?"
    ],
    [BotResponseType.MORE_SYMPTOM]: [
        "Do you have any other symptoms to mention?",
        "Are there any additional symptoms you'd like to share?",
        "Are there more symptoms the patient is experiencing?",
        "Should I consider any other symptoms?",
        "Are there any other symptoms besides these?",
        "Are there additional symptoms we should discuss?",
        "Should I know about any other symptoms?",
        "Are there more symptoms the patient wants to tell me about?",
        "Are there any other symptoms the patient has noticed?",
        "Does the patient have further symptoms to mention?"
    ],
    [BotResponseType.DISEASE]:[
      
    ],
    [BotResponseType.MEDICINE]:[
      
    ]
    
  };