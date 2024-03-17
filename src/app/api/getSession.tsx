// pages/api/getSession.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.userId as string; // Assuming userId is passed as a query parameter
    // Check if there exists any session for the user
    let session = await prisma.chatSession.findFirst({
      where: { userId: parseInt(userId) },
    });

    // If no session exists, create a new session
    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          userId: parseInt(userId),
        },
      });
    } 

    res.status(200).json({ session });
  } catch (error) {
    console.error('Error fetching or creating session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
