const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');  // Make sure this path is correct
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

app.prepare().then(() => {
    const expressServer = express();

    // Serve Swagger UI at /api-docs
    expressServer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Handle all other routes with Next.js
    expressServer.all('*', (req, res) => {
        return handle(req, res);
    });

    // Create HTTPS server
    const server = createServer(sslOptions, expressServer);

    // Setup socket.io
    const io = new Server(server, {
        cors: {
            origin: "https://localhost:3000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected');
        socket.on('new_topic', (topic) => {
            console.log('New topic from client:', topic);
            io.emit('new_topic', topic);
            console.log('Emitted new topic to clients:', topic);
        });

        socket.on('remove_topic', (topic) => {
            console.log('Topic removed from client:', topic);
            io.emit('remove_topic', topic);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on https://localhost:3000');
    });
});
