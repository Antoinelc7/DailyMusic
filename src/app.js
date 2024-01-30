const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const hostname = '0.0.0.0';
const port = '3000';

const server = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo/apinode");

server.use(express.json());
server.use(express.urlencoded());

const userRoute = require("./api/routes/userRoute");
userRoute(server);

const votingSessionRoute = require("./api/routes/votingSessionRoute");
votingSessionRoute(server);

const musicRoute = require("./api/routes/musicRoute");
musicRoute(server);

const voteRoute = require("./api/routes/voteRoute");
voteRoute(server);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DailyMusic API',
      version: '1.0.0',
      description: 'DailyMusic API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      BearerAuth: [],
    }],
  },
  apis: ['./api/routes/*.js'],
};
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));