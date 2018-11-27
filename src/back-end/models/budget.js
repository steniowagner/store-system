const BudgetModel = (sequelize, DataTypes) => {
  const {
    STRING,
    FLOAT,
    JSON,
    TEXT,
  } = DataTypes;

  const Model = sequelize.define('Budget', {
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

    validity: {
      type: STRING,
    },

    status: {
      type: STRING,
    },

    salesman: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },
  });

  return Model;
};

module.exports = BudgetModel;
