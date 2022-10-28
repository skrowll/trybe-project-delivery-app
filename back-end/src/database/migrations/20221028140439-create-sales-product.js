module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales_Products', {
      saleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'sale_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Sales',
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'product_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Sales_Products');
  }
};