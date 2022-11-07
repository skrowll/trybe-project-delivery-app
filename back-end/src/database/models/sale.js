module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'sales',
    timestamps: false
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users,
      { foreignKey: 'userId', as: 'user' }
    );
    Sales.belongsTo(models.users,
      { foreignKey: 'sellerId', as: 'seller' }
    );
  };

  return Sales;
};