const express = require('express');
const cors = require('cors');
const urlRoutes = require('./src/routes/urlRoutes');
const loggerMiddleware = require('./src/middleware/logger');
const DB = require('./src/Db/connectDb');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(loggerMiddleware);
DB();

app.use('/api/urls', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
