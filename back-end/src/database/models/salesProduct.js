module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'salesProducts',
  });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SalesProducts;
};