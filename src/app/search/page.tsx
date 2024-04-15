import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Profile from "@/app/components/Profile";
import Search from "./Search";

const getCurrentUser = async () => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) return;
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email }
      });
      if (!currentUser) return;
      return currentUser;
    } catch (e: any) {
      // simply ignores if no user is logged in
      return;
    }
  };

const getLatestSession = async (userId: any) => {
    try {
      const session = await prisma.chatSession.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return session;
    } catch (e: any) {
      // simply ignores if no user is logged in
      return;
    }

}

const getSpecialist = async (disease: string) => {
    try {
        const specialistMap = new Map([
            ["Allergist", ["allergy", "bronchial asthma"]],
            ["Audiologist", ["deafness", "hearing loss"]],
    
            ["Cardiologist", ["hypertension", "heart"]],
            ["Dentist", ["dental", "periodontal", "edentulism", "oro-dental", "noma"]],
            ["Dermatologist", ["fungal", "drug", "acne", "psoriasis", "impetigo", "melanoma"]],
    
            ["Endocrinologist", ["diabetes", "hypothyroidism", "hypoglycemia"]],
            ["Primary Care Physician", ["common",]],
            ["Gastroenterologist", ["gerd", "chronic", "peptic", "gastroenteritis", "jaundice", "dimorphic"]],
    
            ["Hepatologist", ["hepatitis a", "hepatitis b", "hepatitis c", "hepatitis d", "hepatitis e", "alcoholic hepatitis"]],
    
            ["Infectious Disease Specialist", ["aids", "malaria", "chicken pox", "dengue", "typhoid", "covid-19"]],
    
            ["Neurologist", ["migraine", "paralysis", "acoustic"]],
            ["Ophthalmologist", ["color", "refractive", "age-related", "cataract", "diabetic", "glaucoma", "amblyopia", "strabismus"]],
            ["Oncologist", ["breast", "colorectal", "kidney", "lung", "lymphoma"]],
            ["Otolaryngologist", ["Vertigo", "oral", "earache", "ear", "fluid", "glue"]],
    
            ["Physiatrist", ["cervical"]],
            ["Plastic Surgeon", ["cleft"]],
            ["Pulmonologist", ["tuberculosis", "pneumonia"]],
            ["Rheumatologist", ["osteoarthritis", "arthritis"]],
            ["Urologist", ["urinary", "bladder"]],
            ["Vascular Surgeons", ["varicose"]],
        ]);
    
        // Loop through the specialistMap
        for (const [specialist, diseases] of specialistMap as any) {
            // Check if the disease exists in the specialist's array of treated diseases
            if (diseases.includes(disease?.toLowerCase())) {
                return specialist;
            }
        }
    
        return "No specialist found for the given disease";
    } catch (e: any) {
        // simply ignores if no user is logged in
        return;
    }
}

export default async function Page() {
    const user = await getCurrentUser();
    const userId = user?.id;
    const session = await getLatestSession(userId);
    const latestDiagnosis = session?.diagnosis;
    const disease = latestDiagnosis?.split(' ')[4] ?? '';
    const specialist = await getSpecialist(disease) ?? '';
    return (
        <>
            <header>
                <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="HealthMe Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HealthMe</span>
                    </a>
                    <div className="flex items-center">
                        <Profile user={user} />
                    </div>
                </div>
                </nav>
            </header>
            {/*Display to the user the latest diagnosis */}
            <div className="bg-gray-950 text-white text-center py-4 mb-4">
                <h1 className="text-lg">Based on your latest diagnosis by <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">AI</span>, here is a recommended specialist:</h1>
                <p className="fade-in-text text-2xl">{specialist}</p>
            </div>
            <Search specialistValue={specialist?.toLowerCase()} specialistLabel={specialist} />
        </>
    )

}