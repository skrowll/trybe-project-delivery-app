const express = require('express');
const CustomerController = require('../controllers/customer.controller');
const validateCustomerToken = require('../middlewares/customer.middleware');

const customer = express();

customer.get('/products', CustomerController.customerPath);
customer.post('/checkout', validateCustomerToken, CustomerController.createOrder);

module.exports = customer;
