const path = require('node:path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const publicDirectory = path.join(__dirname, '../client');

app.use(express.json({ limit: '1mb' }));
app.use('/api', apiRoutes);
app.use(express.static(publicDirectory));

app.use((request, response) => {
  response.status(404).json({ error: 'Route not found.' });
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(error.statusCode || 500).json({
    error: error.message || 'Internal server error.'
  });
});

module.exports = app;
