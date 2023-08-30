

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

interface RequestBody {
    email: string;
    password: string;
    name: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    prismaClient: PrismaClient = new PrismaClient()  // Default to a new PrismaClient
) {
    const { method, body } = req;

    switch (method) {
        case 'POST':
            try {
                const { email, password, name } = body as RequestBody;
                const existingUser = await prismaClient.user.findUnique({ where: { email } });

                if (existingUser)
                    return res.status(400).json({ message: 'Email already exists' });

                // Check password length
                if (password.length < 14)
                    return res
                        .status(400)
                        .json({ message: 'Password must be at least 14 characters' });

                // Create password hash
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Create user
                const newUser = await prismaClient.user.create({
                    data: { email, password: hashedPassword, name },
                });

                console.log(`${newUser.email} signed up at ${new Date().toISOString()}`);

                res.status(201).json(newUser);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
