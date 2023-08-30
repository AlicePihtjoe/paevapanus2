import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import fs from 'fs'; // Import fs for mocking

// Mock Environment Variables
process.env.JWT_SECRET = 'some-secret';
process.env.GOOGLE_CLIENT_ID = 'some-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'some-client-secret';



process.env = Object.assign(process.env, { NODE_ENV: 'test' });

jest.mock('@prisma/client');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('cookie');
jest.mock('fs'); // Mock fs
jest.mock('google-auth-library'); // Mock OAuth2Client

// Existing mock code
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => {
        return {
            user: {
                findUnique: jest.fn(),
                create: jest.fn(),
            }
        };
    }),
}));

const mockedPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;

// Mock fs.appendFile to prevent file writes during tests
jest.mock('fs', () => ({
    appendFile: jest.fn((path, data, callback) => {
        callback(null);
    }),
}));

// Import your handler here
import handler from './signin';

describe('POST /api/signin', () => {
    let req: NextApiRequest;
    let res: jest.Mocked<NextApiResponse>;

    beforeEach(() => {
        req = {
            method: 'POST',
            body: {
                email: 'john@example.com',
                password: 'correctPassword',
            },
        } as any;

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn(),
            redirect: jest.fn(),
        } as any;

        (jwt.sign as jest.Mock).mockReturnValue('fakeToken');
    });


    it('returns a 400 status for invalid email or password', async () => {
        (mockedPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid email or password',
        });
    });

    it('returns a 400 status for password mismatch', async () => {
        (mockedPrisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'john@example.com',
            password: 'hashedIncorrectPassword',
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid email or password',
        });
    });
});
