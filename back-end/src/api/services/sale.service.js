const { sales, products } = require('../../database/models');
const HttpStatus = require('../../utils/HttpStatus');

const getSalesBySellerId = async (sellerId) => {
  const salesBySellerId = await sales.findAll({ where: { sellerId } });

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

const updateStatus = async (id, status) => {
  const sale = await sales.update({ status }, { where: { id } });

  if (!sale) {
    throw new Error('Sale not found', { cause: { status: HttpStatus.NOT_FOUND } });
  }

  return { message: 'updated' };
};

module.exports = { getSalesBySellerId, getSaleById, updateStatus };