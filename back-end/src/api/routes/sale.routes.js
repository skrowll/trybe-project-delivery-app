const express = require('express');
const SaleController = require('../controllers/sale.controller');

const seller = express();

seller.get('/orders', SaleController.getSalesBySellerId);
seller.get('/orders/:id', SaleController.getSaleById);
seller.patch('/orders/:id', SaleController.updateStatus);

module.exports = seller;