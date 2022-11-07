const express = require('express');
const SaleController = require('../controllers/sale.controller');

const seller = express();

seller.get('/orders', SaleController.getSalesBySellerId);

module.exports = seller;