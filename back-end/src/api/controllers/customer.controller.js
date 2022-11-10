const HttpStatus = require('../../utils/HttpStatus');
const customerService = require('../services/customer.service');

const customerPath = async (_req, res) => {
  const products = await customerService.customerPath();

  return res.status(HttpStatus.OK).json(products);
};

const createOrder = async (req, res) => {
  const saleInfo = req.body;
  const order = await customerService.createOrder(saleInfo);

  return res.status(HttpStatus.CREATED).json(order);
};

const getOrders = async (req, res) => {
  const userId = res.locals.user.id;
  const orders = await customerService.getOrders(userId);
  return res.status(HttpStatus.OK).json(orders);
};

const getOrders = async (req, res) => {
  const userId = res.locals.user.id;
  const orders = await customerService.getOrders(userId);
  return res.status(HttpStatus.OK).json(orders);
};

module.exports = {
  customerPath,
  createOrder,
  getOrders,
};
