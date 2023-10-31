const express = require('express');
const { loginRoute, userRoute } = require('./routes');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoute);

app.use('/user', userRoute);

module.exports = app;
