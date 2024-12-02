const http = require('http');
const server = http.createServer();
server.listen(9898); // On écoute sur le port 9898
// Création du server WebSocket qui utilise le serveur précédent
const WebSocketServer = require('websocket').server;
const wsServer = new WebSocketServer({
 httpServer: server
});

const tabUser = [];

// Mise en place des événements WebSockets
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    // Ecrire ici le code qui indique ce que l'on fait en cas de
    // réception de message et en cas de fermeture de la WebSocket
    connection.on('message', function(message) {
        console.log('Received Message:', message.utf8Data);
        try {
            const receivedData = JSON.parse(message.utf8Data);
            const { action, username, password } = receivedData;
            console.log(username, password); 

            if (action === 'login') {
                console.log('Login attempt');
                const userExists = tabUser.some(user => user.username === username);
                console.log('User exists: attempt');
                if (!userExists) {
                    console.log('User does not exist');
                    tabUser.push({ username, password });
                    connection.send('Login successful');
                } else {
                    console.log('User exists');
                    if (username.password === password) {
                        console.log('Correct password');
                        connection.send('Login successful');
                    } else {
                        console.log('Incorrect password');
                        connection.send('Incorrect password');
                    }
                }
            }
        }catch (error) {
            connection.send('Hello Client!');
        }
    });
    connection.on('close', function(reasonCode, description) {
    // To do
    });
});