const express = require('express');
const hostname = '0.0.0.0';
const port = '3000';

const server = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo/apinode");

server.use(express.json());
server.use(express.urlencoded());

const userRoute = require("./api/routes/userRoute");
userRoute(server);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});