const express = require('express');
const hostname = '0.0.0.0';
const port = '3000';

const server = express();

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.get('/', (req, res) => {
    res.send('Hello World!');
});