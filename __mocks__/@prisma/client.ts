// __mocks__/@prisma/client.ts

export const PrismaClient = jest.fn().mockImplementation(() => {
    return {
        user: {
            create: jest.fn((data) => Promise.resolve(data)),
            findMany: jest.fn(() => Promise.resolve([])),
        },
        $connect: jest.fn(),
        $disconnect: jest.fn(),
    };
});


const prismaMock = {
    user: {
        create: jest.fn(),
    },
};

export { prismaMock };
