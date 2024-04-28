//This file will handle post request to delete user allergies, medications and other health data

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function DELETE(request: Request) {
    try {
        
        const body = await request.json();
        const { type, dataId } = body;
        // Check if user exists (optional, adds robustness)
        if(type === 'allergy') {
            const allergy = await prisma.allergies.findUnique({
                 where: { id : dataId },
            });
            if (!allergy) {
                console.error("No allergy found with id:", dataId);
                return; // Optionally handle this scenario appropriately
            }
            await prisma.allergies.delete({
                where: { id : dataId },
            });
        } else if(type === 'medication') {
            const medication = await prisma.medications.findUnique({
                    where: { id : dataId },
                });
            if (!medication) {
                console.error("No medication found with id:", dataId);
                return; // Optionally handle this scenario appropriately
            }
            await prisma.medications.delete({
                where: { id : dataId },
            });
        } else if(type === 'vital'){
            const vital = await prisma.vitals.findUnique({
                where: { id : dataId },
            });
            if (!vital) {
                console.error("No vital found with id:", dataId);
                return; // Optionally handle this scenario appropriately
            }
            await prisma.vitals.delete({
                where: { id : dataId },
            });
            
        } else if(type === 'chatSession'){
            const chatSession = await prisma.chatSession.findUnique({
                where: { id : dataId },
            });
            if (!chatSession) {
                console.error("No chatSession found with id:", dataId);
                return; // Optionally handle this scenario appropriately
            }
            await prisma.chatSession.delete({
                where: { id : dataId },
            });
                
        }
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.log({ error });
        return NextResponse.json({ error: 'An error occurred while processing your request.' });
    }
}
