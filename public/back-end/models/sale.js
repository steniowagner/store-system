const SaleModel = (sequelize, DataTypes) => {
  const { STRING, FLOAT, JSON } = DataTypes;

  const Model = sequelize.define('Sale', {
    paymentInfo: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: JSON,
    },

    code: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    customer: {
      type: JSON,
    },

    dateToShow: {
      type: STRING,
    },

    discount: {
      type: JSON,
    },

    products: {
      allowNull: false,
      type: JSON,
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

    inDebit: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },
  });

  return Model;
};

module.exports = SaleModel;
