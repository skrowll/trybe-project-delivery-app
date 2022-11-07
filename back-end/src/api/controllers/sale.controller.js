const SaleService = require('../services/sale.service');
const HttpStatus = require('../../utils/HttpStatus');

const getSalesBySellerId = async (req, res, next) => {
  try {
    const result = await SaleService.getSalesBySellerId(req.headers);
    return res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  };
};

module.exports = { getSalesBySellerId };