const { products } = require('../../database/models');

const customerPath = async () => {
  const getProducts = await products.findAll();

  if (!getProducts) throw new Error('Products not found', { cause: { status: 404 } });

  return getProducts;
}

module.exports = {
  customerPath,
}
