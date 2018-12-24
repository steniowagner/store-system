const StockModel = (sequelize, DataTypes) => {
  const { INTEGER } = DataTypes;

  const Model = sequelize.define('Stock', {
    stockQuantity: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: INTEGER,
    },

    minStockQuantity: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: INTEGER,
    },
  });

  Model.associate = ({ Product }) => Model.belongsTo(Product);

  return Model;
};

module.exports = StockModel;
