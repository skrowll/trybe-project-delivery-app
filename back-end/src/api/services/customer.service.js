const HttpStatus = require('../../utils/HttpStatus');
const { products, sales, users, salesProducts, sequelize } = require('../../database/models');

const customerPath = async () => {
  const getProducts = await products.findAll();

  if (!getProducts) {
    throw new Error('Products not found', { cause: { status: HttpStatus.NOT_FOUND } });
  }

  return getProducts;
};

const createOrder = async ({ sale, cart }, userId) => {
  const newSale = await sequelize.transaction(async (transaction) => {
    const order = await sales.create({ ...sale, userId }, { transaction });

    const saleProduct = await cart.map((p) => (
      { saleId: order.id, productId: p.id, quantity: p.quantity }
    ));

    await salesProducts.bulkCreate(saleProduct, { transaction });
    
    return order;
  });
  return newSale.id;
};

const getOrders = async (userId) => {
  const orders = await sales.findAll({ where: { userId } });
  return orders;
};

const getOrderById = async (id) => {
  const order = await sales.findOne({
    where: { id },
    include: [
      { model: products, as: 'products', through: { attributes: ['quantity'] } },
      { model: users, as: 'seller', attributes: ['name'] },
    ],
  });
  if (!order) throw new Error('Order not found', { cause: { status: HttpStatus.NOT_FOUND } });
  return order;
};

module.exports = {
  customerPath,
  createOrder,
  getOrders,
  getOrderById,
};
