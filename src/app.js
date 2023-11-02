const express = require('express');
const { loginRoute, userRoute, categoryRoute, postRoute } = require('./routes');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoute);

app.use('/user', userRoute);

app.use('/categories', categoryRoute);

app.use('/post', postRoute);

module.exports = app;
