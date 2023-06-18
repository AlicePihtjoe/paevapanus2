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
    } else if (req.method === 'DELETE') {
        // Delete a topic

        const { topic } = req.query;

        try {
            const deletedTopic = await prisma.topic.delete({
                where: {
                    name: topic,
                },
            });

            res.status(200).json(deletedTopic);
        } catch (error) {
            console.error('Error deleting topic:', error);
            res.status(500).json({ error: 'Failed to delete topic' });
        }
    } else if (req.method === 'PUT') {
        // Update a topic
        const { name, description } = req.body;

        try {
            const updatedTopic = await prisma.topic.update({
                where: { name },
                data: { description },
            });

            res.status(200).json(updatedTopic);
        } catch (error) {
            console.error('Error updating topic:', error);
            res.status(500).json({ error: 'Failed to update topic' });
        }
    } else if (req.method === 'GET') {
        // Get all topics
        try {
            const topics = await prisma.topic.findMany();
            res.status(200).json(topics);
        } catch (error) {
            console.error('Error getting topics:', error);
            res.status(500).json({ error: 'Failed to get topics' });
        }
    } else {
        res.status(404).json({ error: 'Not found' });
    }
}