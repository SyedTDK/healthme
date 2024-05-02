export interface Message {
    text: string;
    isUser: boolean;
  }
  
  export type PatientInfo = {
    isPatient: boolean;
    name: string;
    age: string;
    gender: string;
    symptoms: string[];
    diagnosis: string;
  };
  