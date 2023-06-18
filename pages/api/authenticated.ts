import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = cookie.parse(req.headers.cookie || '');

    // If the 'token' cookie is present, the user is authenticated.
    if (cookies.token) {
        try {
            const decodedToken = jwt.verify(cookies.token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;

            console.log('Decoded Token:', decodedToken);


            // Fetch user data based on the user ID
            const userData = await fetchUserData(userId);

            res.status(200).json({ authenticated: true, user: userData });
        } catch (err) {
            res.status(200).json({ authenticated: false, error: 'Invalid token' });
        }
    } else {
        res.status(200).json({ authenticated: false });
    }
}


async function fetchUserData(userId: number): Promise<User | null> {
    try {
        console.log('User Id', userId);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        console.log('User Data:', user);
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}