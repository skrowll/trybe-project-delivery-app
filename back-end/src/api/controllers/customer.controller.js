const HttpStatus = require('../../utils/HttpStatus');
const customerService = require('../services/customer.service');

const customerPath = async (_req, res) => {
  const products = await customerService.customerPath();

  return res.status(HttpStatus.OK).json(products);
};

const createOrder = async (req, _res) => {
  const saleInfo = req.body;
  // const order = await customerService.createOrder(saleInfo);
  await customerService.createOrder(saleInfo);

  // return res.status(HttpStatus.CREATED).json(order);
};

const getOrders = async (_req, res) => {
  const userId = res.locals.user.id;
  const orders = await customerService.getOrders(userId);
  return res.status(HttpStatus.OK).json(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await customerService.getOrderById(id);
  return res.status(HttpStatus.OK).json(order);
};

module.exports = {
  customerPath,
  createOrder,
  getOrders,
  getOrderById,
};
