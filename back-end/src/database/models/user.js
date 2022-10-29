module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'users',
  });

  Users.associate = (models) => {
    Users.hasMany(models.sales, 
      { foreignKey: 'userId', as: 'salesUser' },
    );
    Users.hasMany(models.sales, 
      { foreignKey: 'sellerId', as: 'salesSeller' },
    );
  };

  return Users;
};