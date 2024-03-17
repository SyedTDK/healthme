// pages/api/postMessage.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sessionId, text } = req.body;
    // Save the message to the session in the database
    const message = await prisma.message.create({
      data: {
        text,
        sessionId: parseInt(sessionId),
      },
    });

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
