const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);
const port = 8000;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log("Usuário conectado");

    socket.on('chat_message', (msg) => {
        msg.dataHora = new Date().toLocaleString();
        console.log(JSON.stringify(msg));

        io.emit('typing', { "from": 8, "to": 1, "typing": false })
        return io.emit('chat_message', msg);
    });

    socket.on('typing', (isTyping) => {
        console.log(isTyping);

        return io.emit('typing', isTyping);
    });

    socket.on('status', (status) => {
        console.log(status);

        return io.emit('status', status);
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});