const HttpStatus = require('../../utils/HttpStatus');
const { products, sales, salesProducts, sequelize } = require('../../database/models');

const customerPath = async () => {
  const getProducts = await products.findAll();

  if (!getProducts) {
    throw new Error('Products not found', { cause: { status: HttpStatus.NOT_FOUND } });
  }

  return getProducts;
};

const createOrder = async ({ sale, cart }) => {
  const newSale = await sequelize.transaction(async (transaction) => {
    const order = await sales.create(sale, { transaction });

    const saleProduct = await cart.map((p) => (
      { saleId: order.id, productId: p.id, quantity: p.quantity }
    ));

    await salesProducts.bulkCreate(saleProduct, { transaction });

    return order;
  });

  return newSale.id;
};

const getOrders = async () => {
  const orders = await sales.findAll();
  return orders;
};

module.exports = {
  customerPath,
  createOrder,
  getOrders,
};
