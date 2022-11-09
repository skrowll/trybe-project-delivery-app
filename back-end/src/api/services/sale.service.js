const { sales, products } = require('../../database/models');
const HttpStatus = require('../../utils/HttpStatus');
const { configAuthorization } = require('../../utils/Auth');

const getSalesBySellerId = async ({ authorization }) => {
  const { data: { user: { id, role } } } = configAuthorization.verifyAuth(authorization);

  if (role !== 'seller') {
    throw new Error('User must be a seller', { cause: { status: HttpStatus.UNAUTHORIZED } });
  }

  const salesBySellerId = await sales.findAll({ where: { sellerId: id } });

  if (salesBySellerId.length === 0) {
    throw new Error('Sales not found', { cause: { status: HttpStatus.NOT_FOUND } });
  }

  return salesBySellerId;
};

const getSaleById = async ({ id }) => {
  const sale = await sales.findOne({
    where: { id },
    include: [
      { model: products, as: 'products', through: { attributes: ['quantity'] } },
    ],
  });

  if (!sale) {
    throw new Error('Sale not found', { cause: { status: HttpStatus.NOT_FOUND } });
  }

  return sale;
};

module.exports = { getSalesBySellerId, getSaleById };