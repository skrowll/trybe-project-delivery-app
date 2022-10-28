const express = require('express');
const CtrlRegister = require('../controllers/CtrlRegister');
const MidRegister = require('../middlewares/MidRegister');

const register = express();

register.post('/', MidRegister.validateInputs, CtrlRegister.create);

module.exports = register;
