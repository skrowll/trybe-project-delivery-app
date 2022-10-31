module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        user_id: 3,
        seller_id: 2,
        total_price: 100,
        delivery_address: 'Rua Um',
        delivery_number: 'casa 1',
        status: 'Pendente',
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 150.49,
        delivery_address: 'Rua Dois',
        delivery_number: 'casa 2',
        status: 'Preparando',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
