
// POST /api/users

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";

interface RequestBody {
    email: string;
    password: string;
    name: string;
}

const prisma = new PrismaClient();


const logToFile = (message) => {
    console.log(`Logging: ${message}`);
    fs.appendFile('pages/api/events.log', `${message}\n`, (err) => {
        if (err) console.log('Error logging event:', err);
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req;

    switch (method) {
        case 'POST':
            try {
                const { email, password, name } = body as RequestBody;

                const existingUser = await prisma.user.findUnique({ where: { email } });
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
                const newUser = await prisma.user.create({
                    data: { email, password: hashedPassword, name },
                });

                logToFile(`${newUser.email} signed up at ${new Date().toISOString()}`);

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
