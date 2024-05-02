import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import prisma from "@/app/libs/prisma";
import Search from "./Search";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { BotMessageSquare, UserSearch, LayoutDashboard, History, Pill, ClipboardList, ShieldBan} from "lucide-react";
import Profile from "../components/Profile";
import Link from "next/link";

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
    
            ["Cardiologist", ["hypertension", "heart attack"]],
            ["Dentist", ["dental caries (tooth decay)", "periodontal (gum) disease", "edentulism (total tooth loss)", "oro-dental trauma", "noma"]],
            ["Dermatologist", ["fungal infection", "drug reaction", "acne", "psoriasis", "impetigo", "melanoma"]],
    
            ["Endocrinologist", ["diabetes", "hypothyroidism", "hypoglycemia", "vitamin d deficiency"]],
            ["Primary Care Physician", ["common cold", "flu", "strep throat"]],
            ["Gastroenterologist", ["gastroesophageal reflux disease", "chronic cholestasis", "peptic ulcer disease", "gastroenteritis", "jaundice", "dimorphic hemorrhoids", "irritable bowel syndrome"]],
            ["Gynecologist", ["yeast infection"]],
            ["Hepatologist", ["hepatitis a", "hepatitis b", "hepatitis c", "hepatitis d", "hepatitis e", "alcoholic hepatitis"]],
    
            ["Infectious Disease Specialist", ["hiv/aids", "malaria", "chicken pox", "dengue", "typhoid", "covid-19"]],
    
            ["Neurologist", ["migraine", "paralysis (brain hemorrhage)", "acoustic neuroma"]],
            ["Ophthalmologist", ["color blindness", "refractive errors", "age-related macular degeneration", "cataract", "diabetic retinopathy", "glaucoma", "amblyopia", "strabismus"]],
            ["Oncologist", ["breast cancer", "colorectal cancer", "kidney cancer", "lung cancer - non-small cell", "lymphoma - non-hodgkin"]],
            ["Otolaryngologist", ["Vertigo (Paroxysmal Positional Vertigo)", "oral and oropharyngeal cancer", "earache", "ear infection", "ear wax", "fluid from the ear", "glue ear"]],
    
            ["Physiatrist", ["cervical spondylosis"]],
            ["Plastic Surgeon", ["cleft lip and palate"]],
            ["Pulmonologist", ["tuberculosis", "pneumonia"]],
            ["Rheumatologist", ["osteoarthritis", "arthritis"]],
            ["Urologist", ["urinary tract infection", "bladder cancer"]],
            ["Vascular Surgeons", ["varicose veins"]],
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
    const disease = session?.disease?.toString() ?? '';
    
    if (!(user)) {
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
        ) 
        } else {
        const specialist = await getSpecialist(disease) ?? '';
        return (
            <>
                
                <header className="h-16">
                <Profile user={user} />
                </header>
                <main className="flex h-[calc(100vh-4rem)]">
                <Sidebar>
                    <Link href="/healthAnalytics"><SidebarItem icon={<LayoutDashboard />} text="Health Dashboard" active={false} /> </Link>
                    <a href="/chat/new"><SidebarItem icon={<BotMessageSquare />} text="New Chat" active={false} /></a>
                    <Link href="/chat"><SidebarItem icon={<History />} text="Chat History" active={false} /> </Link>
                    <Link href="/search"><SidebarItem icon={<UserSearch />} text="Search Specialist" active={true} /> </Link>
                    <Link href="/healthAnalytics/vitals"><SidebarItem icon={<ClipboardList />} text="Logbook" active={false} /> </Link>
                    <Link href="/healthAnalytics/medications"><SidebarItem icon={<Pill />} text="Medications" active={false} /> </Link>
                    <Link href="/healthAnalytics/allergies"><SidebarItem icon={<ShieldBan />} text="Allergies" active={false} /> </Link>
                </Sidebar>
                {/*Display to the user the latest diagnosis */}
                <div className="flex-grow overflow-y-auto">
                <div className=" text-white text-center py-4 mb-4">
                    <h1 className="text-lg">Based on your latest diagnosis by <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">AI</span>, here is a recommended specialist</h1>
                    <p className="fade-in-text text-2xl">{specialist}</p>
                </div>
                <Search specialistValue={specialist?.toLowerCase()} specialistLabel={specialist} />
                </div>
                </main>
            </>
        )
}
}