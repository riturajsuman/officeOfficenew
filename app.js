const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerOptions'); 

app.use(express.json());

// Mount auth routes at /api/auth
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Swagger UI accessible at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Mount interest routes at /api/interest
const interestRoutes = require('./routes/interestRoutes');
app.use('/api/interest', interestRoutes);

const commuteRoutes = require('./routes/commuteRoutes');
app.use('/api/commuteroutes', commuteRoutes);


app.get('/', (req, res) => {
  res.send('API running...');
});




module.exports = app;
