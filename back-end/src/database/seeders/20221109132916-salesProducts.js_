module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 2,
        quantity: 2,
      },
      {
        sale_id: 1,
        product_id: 3,
        quantity: 2,
      },
      {
        sale_id: 1,
        product_id: 4,
        quantity: 4,
      },
      {
        sale_id: 1,
        product_id: 5,
        quantity: 1,
      },
      {
        sale_id: 1,
        product_id: 7,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 1,
        quantity: 4,
      },
      {
        sale_id: 2,
        product_id: 2,
        quantity: 1,
      },
      {
        sale_id: 2,
        product_id: 4,
        quantity: 4,
      },
      {
        sale_id: 2,
        product_id: 5,
        quantity: 5,
      },
      {
        sale_id: 2,
        product_id: 7,
        quantity: 1,
      },
      {
        sale_id: 2,
        product_id: 9,
        quantity: 1,
      },
      {
        sale_id: 2,
        product_id: 10,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 11,
        quantity: 1,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
};