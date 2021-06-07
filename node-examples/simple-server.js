// Simple Server example:
// Terminal 1: node simple-server.js
// Terminal 2: curl -X GET http://localhost:8080/

const http = require('http');

const port = 8080;
const hostname = '127.0.0.1';       // localhost
const server = http.createServer();

server.on('request', (req, res) => {
    console.log("METHOD\t: " + req.method);
    console.log("HEADERS\t: " + req.headers);
    console.log("URL\t: " + req.url + "\n");

    res.writeHead(200, { "Content-Type" : "application/json" });
    res.end(JSON.stringify( { error: null }) + "\n");
});

server.prependListener('request', () => console.log('INCOMING REQUEST...'));

server.listen(port, hostname, () => {
    console.log(`\nServer running at http://${hostname}:${port}/`);
});
