const SaleService = require('../services/sale.service');
const HttpStatus = require('../../utils/HttpStatus');

const getSalesBySellerId = async (req, res) => {
  const sellerId = res.locals.user.id;
  const result = await SaleService.getSalesBySellerId(sellerId);
  return res.status(HttpStatus.OK).json(result);
};

const getSaleById = async (req, res) => {
  const result = await SaleService.getSaleById(req.params);
  return res.status(HttpStatus.OK).json(result);
};

module.exports = { getSalesBySellerId, getSaleById };