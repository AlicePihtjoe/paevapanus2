
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/users

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}