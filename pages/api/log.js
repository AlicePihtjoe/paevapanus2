import fs from "fs";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;
        fs.appendFileSync('pages/api/events.log', `${message}\n`);
        res.status(200).json({ message: 'Log recorded' });
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
