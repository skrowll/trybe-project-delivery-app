// require('express-async-errors'); // não instalado && aplicado

const express = require('express');

const userController = require('../controller/user.controller');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.post('/login', userController.loginUser);

module.exports = app;
