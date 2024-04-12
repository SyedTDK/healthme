//getUser handler that handles a GET request when the users submit the login form to the endpoint to get user details.

import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!currentUser) return;
    return NextResponse.json(currentUser);
  } catch (error: any) {
    console.log({ error });
  }
}