const SaleModel = (sequelize, DataTypes) => {
  const {
    BOOLEAN,
    STRING,
    FLOAT,
    JSON,
    TEXT,
  } = DataTypes;

  const Model = sequelize.define('Sale', {
    paymentInfo: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: JSON,
    },

    customer: {
      type: JSON,
    },

    discount: {
      type: JSON,
    },

    products: {
      allowNull: false,
      type: TEXT,
    },

    subtotal: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    total: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    observation: {
      type: STRING,
    },

    salesman: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    isInDebit: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: BOOLEAN,
    },
  });

  return Model;
};

module.exports = SaleModel;
