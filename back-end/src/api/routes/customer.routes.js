const express = require('express');
const CustomerController = require('../controllers/customer.controller');
// const validateToken = require('../middlewares/auth.middleware');

const customer = express();

customer.get('/products', CustomerController.customerPath);
customer.post('/checkout', CustomerController.createOrder);

module.exports = customer;