import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
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
