const express = require('express');
const userController = require('../controllers/user.controller');

const user = express();

user.get('/', userController.all);
user.get('/one', userController.one);

module.exports = user;