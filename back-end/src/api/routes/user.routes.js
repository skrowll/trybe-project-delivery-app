const express = require('express');
const userController = require('../controllers/user.controller');

const user = express();

user.get('/', userController.all);

module.exports = user;