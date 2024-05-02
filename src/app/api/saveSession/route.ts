//This file will handle post request to save user sympotms and diagnosis 

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request: Request) {
    try {
        
        const body = await request.json();
        const { userId, symptoms, diagnosis, disease } = body;
        // Check if user exists (optional, adds robustness)
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            console.error("No user found with id:", userId);
            return; // Optionally handle this scenario appropriately
        }
        const chatSession = await prisma.chatSession.create({
            data: { userId, symptoms, diagnosis, disease },
        });
        return NextResponse.json(chatSession);
    } catch (error: any) {
        console.log({ error });
        return NextResponse.json({ error: 'An error occurred while processing your request.' });
    }
}
