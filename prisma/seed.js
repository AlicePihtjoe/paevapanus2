const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Add initial data here
    const newUser = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securepassword',
        },
    });

    console.log('User created:', newUser);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
