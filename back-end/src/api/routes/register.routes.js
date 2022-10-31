const express = require('express');
const RegisterController = require('../controllers/register.controller');
const RegisterMiddleware = require('../middlewares/register.middleware');

const register = express();

register.post('/', RegisterMiddleware.validateInputs, RegisterController.create);

module.exports = register;
