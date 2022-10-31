module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'products',
  });
  
  return Products;
};