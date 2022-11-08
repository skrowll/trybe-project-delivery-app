module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 2,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {});
  }
};