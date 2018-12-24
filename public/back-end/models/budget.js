const BudgetModel = (sequelize, DataTypes) => {
  const { STRING, FLOAT, JSON } = DataTypes;

  const Model = sequelize.define('Budget', {
    customer: {
      type: JSON,
    },

    code: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
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
