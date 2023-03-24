// POST /api/users

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler({ method, body }, res) {
    switch (method) {
        case 'POST':
            try {
                const { email, password, name } = body;

                const existingUser = await prisma.user.findUnique({ where: { email } });
                if (existingUser) return res.status(400).json({ message: 'Email already exists' });

                // Check password length
                if (password.length < 14) return res.status(400).json({ message: 'Password must be at least 14 characters' });

                const costFactor = new Date().getFullYear() - 2000;
                const hashedPassword = await bcrypt.hash(password, costFactor);

                const newUser = await prisma.user.create({
                    data: { email, password: hashedPassword, name },
                });

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
