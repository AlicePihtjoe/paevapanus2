import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
    } else {
        try {
            const data = fs.readFileSync(path.resolve('pages/api/events.log'), 'utf8');
            const logs = data.split('\n').filter(Boolean).map((line) => {
                line = line.trim(); // This will remove any leading or trailing whitespace
                const [message, timestamp] = line.split(' at ');
                return { message, timestamp };
            });

            res.status(200).json(logs);
        } catch (err) {
            console.error('Error reading log file:', err);
            res.status(500).json({ message: 'Error reading log file' });
        }
    }
}
