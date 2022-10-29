require('express-async-errors');
const express = require('express');
const cors = require('cors');

const { errorHandler } = require('../middleware/login.midd');
const userController = require('../controller/user.controller');

const app = express();

app.use(express.json());

app.use(cors());

app.post('/login', userController.loginUser);

app.use(errorHandler);

module.exports = app;
