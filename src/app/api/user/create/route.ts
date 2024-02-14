// create a new user in the database with the following properties: Name, Email, Password, birthDate, and gender.
import prisma from '../../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'
import { User } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, password, birthDate, gender } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        birthDate,
        gender
        }
    });
    res.json(user);
    } else {
        res.status(405).json({ message: 'We only support POST requests' });
    }
}

