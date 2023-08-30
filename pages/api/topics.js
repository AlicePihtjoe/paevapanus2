/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         userId:
 *           type: integer
 *         googleId:
 *           type: integer
 */

/**
 * @swagger
 * /api/topics:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *     responses:
 *       201:
 *         description: Topic successfully created
 *       500:
 *         description: Failed to create topic
 *
 *   delete:
 *     summary: Delete a topic
 *     tags: [Topics]
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: true
 *         description: The topic name
 *     responses:
 *       200:
 *         description: Topic successfully deleted
 *       500:
 *         description: Failed to delete topic
 *
 *   put:
 *     summary: Update a topic
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Topic successfully updated
 *       500:
 *         description: Failed to update topic
 *
 *   get:
 *     summary: Retrieve a list of topics
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of topics
 *       500:
 *         description: Failed to retrieve topics
 */

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