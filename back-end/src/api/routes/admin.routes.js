const express = require('express');
const RegisterController = require('../controllers/register.controller');
const auth = require('../middlewares/auth.middleware');
const RegisterMiddleware = require('../middlewares/register.middleware');

const admin = express();

admin.post(
  '/manage',
  auth.validateAdminToken,
  RegisterMiddleware.validateInputs,
  RegisterController.adminCreate,
);

module.exports = admin;