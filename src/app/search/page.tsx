import Link from 'next/link';
import Profile from "@/app/components/Profile";
import Search from './Search';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import { OptionType } from './options';

import prisma from "@/app/libs/prisma";


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

//Prisma Query for finding latest session of the user
const getLatestSession = async (id: number) => {
    const session = await prisma.chatSession.findMany({
        where: {
            userId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 1,
    });
    return session;
}

function findSpecialist(disease: string) {
    // Map specialists to arrays of diseases they can treat, add more as needed
    const specialistMap = new Map([
        ["Allergist", ["allergy", "bronchial"]],
        ["Audiologist", ["deafness", "hearing"]],

        ["Cardiologist", ["hypertension", "heart"]],
        ["Dentist", ["dental", "periodontal", "edentulism", "oro-dental", "noma"]],
        ["Dermatologist", ["fungal", "drug", "acne", "psoriasis", "impetigo", "melanoma"]],

        ["Endocrinologist", ["diabetes", "hypothyroidism", "hypoglycemia"]],
        ["Primary Care Physician", ["common",]],
        ["Gastroenterologist", ["gerd", "chronic", "peptic", "gastroenteritis", "jaundice", "dimorphic"]],

        ["Hepatologist", ["hepatitis", "alcoholic"]],

        ["Infectious Disease Specialist", ["aids", "malaria", "chicken", "dengue", "typhoid", "covid-19"]],

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
    for (const [specialist, diseases] of specialistMap) {
        // Check if the disease exists in the specialist's array of treated diseases
        if (diseases.includes(disease.toLowerCase())) {
            return specialist;
        }
    }

    return "No specialist found for the given disease";
}


export default async function Page() {
    const user = await getCurrentUser();
    const userId = user?.id ?? 0; // Provide a default value of 0 if user?.id is undefined
    const session = await getLatestSession(userId);
    const latestDiagnosis = session[0]?.diagnosis ?? "No diagnosis found";
    const disease = latestDiagnosis.split(' ')[4];
    const specialist = findSpecialist(disease);
    const specialistValue = specialist.toLowerCase();
    const defaultValue: OptionType = {
        value: specialistValue,
        label: specialist
    };
    
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
                            <Profile user={user} />
                        </div>
                    </div>
                    </nav>
                </header>

                <Search defaultValue={defaultValue} />
            </>
        
        );
} 


// function Logo() {
//     return (
//         <div className="mt-2 mb-4 w-fit h-fit mx-auto">
//             <Link href="/" className="flex items-center justify-center">
//                 <Image
//                     src="/logo.png"
//                     alt="HealthMe Logo"
//                     width={100}
//                     height={100}
//                     className="mr-4 w-1/3 h-1/3"
//                     priority={true}
//                 />
//                 <h1 className="lg:text-3xl md:text-2xl text-xl inline">HealthMe</h1>
//             </Link>
//         </div>
//     );
// }
