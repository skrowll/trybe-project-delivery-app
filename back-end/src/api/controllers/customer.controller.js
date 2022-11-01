const HttpStatus = require('../../utils/HttpStatus');
const customerService = require('../services/customer.service');

const customerPath = async (_req, res) => {
  const products = await customerService.customerPath();

  return res.status(HttpStatus.OK).json(products);
};

const createOrder = async (req, res) => {
  const saleInfo = req.body;
  // const order = await customerService.createOrder(saleInfo);
  await customerService.createOrder(saleInfo);

  // return res.status(HttpStatus.CREATED).json(order);
};

module.exports = {
  customerPath,
  createOrder,
};
