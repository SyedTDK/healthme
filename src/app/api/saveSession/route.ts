//This file will handle post request to save user sympotms and diagnosis 

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { userId, symptoms, diagnosis } = body;
        const chatSession = await prisma.chatSession.create({
            data: { userId, symptoms, diagnosis },
        });
        return NextResponse.json(chatSession);
    } catch (error: any) {
        console.log({ error });
        return NextResponse.json({ error: 'An error occurred while processing your request.' });
    }
}
