import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cookies = cookie.parse(req.headers.cookie || '');

    // If the 'token' cookie is present, the user is authenticated.
    if (cookies.token) {
        res.status(200).json({ authenticated: true });
    } else {
        res.status(200).json({ authenticated: false });
    }
}
