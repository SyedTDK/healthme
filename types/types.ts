export interface Message {
    text: string;
    isUser: boolean;
  }
  
  export interface PatientInfo {
    isPatient: boolean | null;
    name: string;
    age: string;
    gender: string;
    symptoms: string[];
  }
  