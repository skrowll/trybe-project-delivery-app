const express = require('express');
const CustomerController = require('../controllers/customer.controller');
const auth = require('../middlewares/customer.middleware');

const customer = express();

customer.get('/products', CustomerController.customerPath);
customer.post('/checkout', auth.validateToken, CustomerController.createOrder);
customer.post('/checkout', auth.validateToken, CustomerController.createOrder);
customer.get('/orders', auth.validateToken, CustomerController.getOrders);

module.exports = customer;
