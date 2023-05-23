import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

interface RequestBody {
    email: string;
    password: string;
}

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req;

    switch (method) {
        case 'POST':
            try {
                const { email, password } = body as RequestBody;

                // Find user
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user)
                    return res.status(400).json({ message: 'Invalid email or password' });

                // Check password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return res.status(400).json({ message: 'Invalid email or password' });

                // Create JWT
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                    expiresIn: '7d',
                });

                // Set a cookie to signify that the user is logged in
                res.setHeader('Set-Cookie', [
                    cookie.serialize('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 604800,
                        path: '/',
                    }),
                    cookie.serialize('loggedIn', 'true', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 604800,
                        path: '/',
                    }),
                ]);

                // Return successful sign in message
                res.status(200).json({ message: 'Logged in successfully', redirect: '/betting' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}