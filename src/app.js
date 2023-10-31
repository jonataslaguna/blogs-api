const express = require('express');
const { loginRoute } = require('./routes');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoute);

module.exports = app;
