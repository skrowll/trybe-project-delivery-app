const express = require('express');
const RegisterController = require('../controllers/register.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const RegisterMiddleware = require('../middlewares/register.middleware');

const admin = express();

admin.post(
  '/manage',
  authMiddleware,
  RegisterMiddleware.validateInputs,
  RegisterController.adminCreate,
);

module.exports = admin;