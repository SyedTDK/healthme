// This is a dynamic route that will match any path that starts with /chat/ and has a second segment.

import prisma from "@/app/libs/prisma";

export default async function Page({ params }: { params: { slug: number } }) {
    const sessionId = params.slug;
    //Fetch synmptoms and diagnosis for the specific session
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId }
    });
    
    //Display symptoms and diagnosis from the chat session.
    return (
      <div>
        <h1>Chat Session</h1>
        <p>Symptoms: {session?.symptoms}</p>
        <p>Diagnosis: {session?.diagnosis}</p>
        
      </div>
    );



    

  }