const ProductModel = (sequelize, DataTypes) => {
  const { STRING, FLOAT } = DataTypes;

  const Model = sequelize.define('Product', {
    barcode: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    description: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    costPrice: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    salePrice: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },
  });

  Model.associate = ({ Brand }) => Model.belongsTo(Brand);

  return Model;
};

module.exports = ProductModel;
