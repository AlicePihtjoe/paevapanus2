import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import cookie from 'cookie';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import fs from "fs";

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
    const code = req.query.code as string;

    if (!code) {
        res.status(400).json({ message: 'Authorization code is missing.' });
        return;
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'https://localhost:3000/api/exchange_code'
    );

    let tokens;
    try {
        const { tokens: newTokens } = await oauth2Client.getToken(code);
        tokens = newTokens;
    } catch (error) {
        console.error('Failed to exchange code:', error);
        res.status(500).json({ message: 'Failed to exchange code.' });
        return;
    }

    const { id_token } = tokens;

    const ticket = await oauth2Client.verifyIdToken({
        idToken: id_token!,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Create or update the user in your database
    const user = await prisma.user.upsert({
        where: {
            googleId: payload.sub,
        },
        update: {
            email: payload.email,
            name: payload.name,
            googleId: payload.sub,
        },
        create: {
            email: payload.email,
            name: payload.name,
            googleId: payload.sub,
            password: 'lol', // Assign a dummy password value
        },
    });

    logToFile(`Google user with email ${user.email} logged in at ${new Date().toISOString()}`);

    // Sign a JWT for session management
    const sessionToken = jwt.sign(
        { id: user.id, email: user.email, userId: user.id },
        process.env.JWT_SECRET as string
    );

    // Set a cookie for the session token
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/',
        })
    );

    res.writeHead(302, { Location: '/' });
    res.end()
}
