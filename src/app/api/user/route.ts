import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
 import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";


/*
The api is working for now, I am able to get the user data from the database and display it on the frontend.
if you are able to optimize the code, please do so. Dont worry about the PUT, We don't need it. If you can show me
how I can use the medicalInfo model.
*/


async function getCurrentUser(email: string) {

  console.log('email:', email)
  const currentUser = await prisma.user.findUnique({
    where: { email },
  });
  console.log('currentUser:', currentUser)

  if (!currentUser) {
    throw new Error('User not found');
  }

  return currentUser;
}

export async function GET() {
  try {
    
    const session = await getServerSession(authOptions);
    console.log('session:', session);
  if (!session?.user?.email) return NextResponse.json({ error: 'User not found' });

    // const currentUser = await getCurrentUser("fardeen@goat.com");
    const currentUser = await getCurrentUser(session.user.email);

    console.log('currentUser from c:', currentUser);
    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' });
  }

 }

export async function POST(req: Request) {
   try {
     const session = await getServerSession(authOptions);
     if (!session?.user?.email) return NextResponse.error;
     console.log('session:', session);

    //  const currentUser = await getCurrentUser(session.user.email);

    // const currentUser = await getCurrentUser("fardeen@goat.com");

     const { name, email, birthDate } = await req.json();
     const data = { name, email, birthDate };
     if (birthDate) data.birthDate = new Date(birthDate);

     const updatedUser = await prisma.user.update({
       where: { email: session.user.email },
       data,
     });

    // const updatedUser = await prisma.user.update({
    //   where: { email: "fardeen@goat.com" },
    //   data,
    // });
     return NextResponse.json(updatedUser);
   } catch (error) {
     return NextResponse.json({ error: 'Error updating user' });
   }
 }

 export async function PUT(req: Request) {
   try {
     const session = await getServerSession(authOptions);
     if (!session?.user?.email) return NextResponse.error;

     const { name, email, birthDate } = await req.json();
     const data = { name, email, birthDate };
     if (birthDate) data.birthDate = new Date(birthDate);

     const updatedUser = await prisma.user.update({
       where: { email: session.user.email },
       data,
     });

     return NextResponse.json(updatedUser);
   } catch (error) {
     return NextResponse.json({ error: 'Error updating user' });
   }
 }