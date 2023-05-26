const {createServer} = require('https');
const {parse} = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const {Server} = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

// Set the path to the certificate and private key
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

app.prepare().then(() => {
    const server = createServer(sslOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on https://localhost:3000');
    });

    // Setup socket.io
    const io = new Server(server, {
        // options
        cors: {
            origin: "https://localhost:3000", // ensure this matches your site
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('new_topic', (topic) => {
            console.log('New topic from client: ', topic);
            io.emit('new_topic', topic);
            console.log('Emitted new topic to clients: ', topic);
        });

        socket.on('remove_topic', (topic) => {
            console.log('Topic removed from client: ', topic);
            io.emit('remove_topic', topic);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
});