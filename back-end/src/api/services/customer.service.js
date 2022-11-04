const HttpStatus = require('../../utils/HttpStatus');
const { products, sales, salesProducts, sequelize } = require('../../database/models');

const customerPath = async () => {
  const getProducts = await products.findAll();

  if (!getProducts) {
    throw new Error('Products not found', { cause: { status: HttpStatus.NOT_FOUND } });
  }

  return getProducts;
};

const createOrder = async ({ sale, produtos }) => {
  const newSale = await sequelize.transaction(async (transaction) => {
    const order = await sales.create(sale, { transaction });

    const saleProduct = await produtos.map((p) => (
      { saleId: order.id, productId: p.id, quantity: p.quantity }
    ));

    await salesProducts.bulkCreate(saleProduct, { transaction });

    return order;
  });

  return newSale;
};

module.exports = {
  customerPath,
  createOrder,
};

// {
//   "sale": {
//     "userId": 1,
//     "sellerId": 1,
//     "totalPrice": 4.99,
//     "deliveryAddress": "A Casa ali da Esquina",
//     "deliveryNumber": 5
//   },
//   "produtos": [
//     {
//       "id": 1,
//       "name": "Skol Lata 250ml",
//       "price": 2.20,
//       "quantity": 2
//     },
//     {
//       "id": 2,
//       "name": "Brahma Duplo Malte 350ml",
//       "price": 2.79,
//       "quantity": 1
//     },
//     {
//       "id": 11,
//       "name": "Stella Artois 275ml",
//       "price": "3.49",
//       "quantity": 1
//     }
//   ]
// }
