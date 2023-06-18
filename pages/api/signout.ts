import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const logToFile = (message) => {
    console.log(`Logging: ${message}`);
    fs.appendFile('pages/api/events.log', `${message}\n`, (err) => {
        if (err) console.log('Error logging event:', err);
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const cookies = cookie.parse(req.headers.cookie || '');
                const token = req.cookies.token;
                const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
                const userEmail = decoded.email;

                let user;
                if (decoded.googleId) {
                    user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                { id: decoded.userId },
                                { googleId: decoded.googleId },
                            ],
                        },
                    });
                } else {
                    user = await prisma.user.findFirst({
                        where: {
                            id: decoded.userId,
                        },
                    });
                }

                if (!user) {
                    console.error("User not found");
                    return res.status(500).json({ message: "User not found" });
                }

                const googleId = user.googleId;
                if (googleId) {
                    logToFile(`Google user with email ${userEmail} logged out at ${new Date().toISOString()}`);
                } else {
                    logToFile(`${user.email} logged out at ${new Date().toISOString()}`);
                }

                // Clear the cookies
                res.setHeader('Set-Cookie', [
                    cookie.serialize('token', '', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: -1,
                        path: '/',
                    }),
                    cookie.serialize('loggedIn', '', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: -1,
                        path: '/',
                    }),
                ]);

                // Return successful sign out message
                res.status(200).json({ message: 'Logged out successfully' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}