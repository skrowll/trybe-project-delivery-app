const customerService = require('../services/customer.service');

const customerPath = async (_req, res) => {
  const products = await customerService.customerPath();

  return res.status(200).json(products);
};

module.exports = {
  customerPath,
};