const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'APIs for signup, login, and user profile'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(swaggerOptions);
