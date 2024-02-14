//create login endpoint.

import prisma from '../../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { User } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await compare(password, user.password || '');
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = sign({ userId: user.id }, process.env.JWT_SECRET || '', {
        expiresIn: '30d'
    });
    res.json({ token });
  } else {
    res.status(405).json({ message: 'We only support POST requests' });
  }
}