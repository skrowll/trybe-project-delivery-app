module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        user_id: 3,
        seller_id: 2,
        total_price: 67.14,
        delivery_address: 'Rua Do Zé Birita',
        delivery_number: 'casa 1',
        status: 'Pendente',
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 85.33,
        delivery_address: 'Rua Do Zé Birita',
        delivery_number: 'casa 1',
        status: 'Preparando',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
