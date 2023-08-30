import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

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

jest.mock('bcryptjs');

import handler from './users';

const mockedPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;

describe('POST /api/users', () => {
    let req: NextApiRequest;
    let res: jest.Mocked<NextApiResponse>;

    beforeEach(() => {
        req = {
            method: 'POST',
            body: {
                email: 'john@example.com',
                password: 'longenoughpassword',
                name: 'John Doe',
            },
        } as any;

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn(),
        } as any;
    });

    it('creates a new user successfully', async () => {
        (mockedPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        (bcrypt.genSalt as jest.Mock).mockResolvedValue('randomSalt');
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        (mockedPrisma.user.create as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'john@example.com',
            password: 'hashedPassword',
            name: 'John Doe',
        });

        await handler(req, res, mockedPrisma);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            email: 'john@example.com',
            password: 'hashedPassword',
            name: 'John Doe',
        });
    });

    it('returns a 400 status if the email already exists', async () => {
        (mockedPrisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'john@example.com',
            password: 'hashedPassword',
            name: 'John Doe',
        });

        await handler(req, res, mockedPrisma);

        expect(mockedPrisma.user.findUnique).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email already exists',
        });
    });

        it('returns a 400 status if the password is too short', async () => {
        req.body.password = 'short';

        await handler(req, res);

        expect((res.status as jest.Mock)).toHaveBeenCalledWith(400);
        expect((res.json as jest.Mock)).toHaveBeenCalledWith({
            message: 'Password must be at least 14 characters',
        });
    });

    it('returns a 500 status if bcrypt hashing fails', async () => {
        // Mock the Prisma findUnique method to return null (no existing user)
        (mockedPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        // Mock the bcrypt.hash method to throw an error
        (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Some bcrypt error'));

        // Run the handler
        await handler(req, res, mockedPrisma);

        // Expect a 500 status code
        expect(res.status).toHaveBeenCalledWith(500);
        // Expect the error message
        expect(res.json).toHaveBeenCalledWith({
            message: 'Some bcrypt error',
        });
    });


    it('returns a 500 status on server error', async () => {
        // Force prisma.user.create to throw an exception
        (mockedPrisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Some error'));

        try {
            await handler(req, res, mockedPrisma);
        } catch (e) {
            // This catch block is just to prevent Jest from complaining
        }
        // Check that the response status was set to 500
        expect(res.status).toHaveBeenCalledWith(500);

        // Check that the response body was set to the error message
        expect(res.json).toHaveBeenCalledWith({ message: 'Some error' });
    });
});
