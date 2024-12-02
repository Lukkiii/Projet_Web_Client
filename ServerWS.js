const http = require('http');
const app = require('./app');
const WebSocketServer = require('websocket').server;
require('dotenv').config();

const PORT = 9898;

const server = http.createServer(app);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', (request) => {
    const wsConnection = request.accept(null, request.origin);
    console.log('WebSocket connection established');

    wsConnection.on('message', async (message) => {
        if (message.type === 'utf8') {
            const data = JSON.parse(message.utf8Data);
            console.log('Received Message:', data);
            if (data.action === 'register') {
                await handleRegister(wsConnection, data);
            } else if (data.action === 'login') {
                await handleLogin(wsConnection, data);
            }
        } else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            wsConnection.sendBytes(message.binaryData);
        }
    });

    wsConnection.on('close', (reasonCode, description) => {
        console.log('Connection closed');
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const { handleRegister, handleLogin } = require('./controllers/user');