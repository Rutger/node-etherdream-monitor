var WebSocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var server = require('http').createServer();
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
var wss = new WebSocketServer({server: server});

server.on('request', app);
server.listen(8080, function () {
    console.log('Listening on http://localhost:8080');
});

class Monitor {
    update(data) {
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(data), function () { /* ignore errors */ });
        });
    }
}

module.exports = new Monitor;
