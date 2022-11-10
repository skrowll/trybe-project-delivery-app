const express = require('express');
const CustomerController = require('../controllers/customer.controller');
const auth = require('../middlewares/customer.middleware');

const customer = express();

customer.get('/products', CustomerController.customerPath);
customer.post('/checkout', CustomerController.createOrder);
customer.get('/orders', CustomerController.getOrders);
customer.get('/orders/:id', CustomerController.getOrderById);

module.exports = customer;
