import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Create a new topic
        const { name, description, userId, googleId } = req.body;

        try {
            const topic = await prisma.topic.create({
                data: {
                    name,
                    description,
                    user: { connect: { id: userId || googleId } },
                },
            });

            res.status(201).json(topic);
        } catch (error) {
            console.error('Error creating topic:', error);
            res.status(500).json({ error: 'Failed to create topic' });
        }
    } else {
        res.status(404).json({ error: 'Not found' });
    }
}
