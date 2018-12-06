const CashierModel = (sequelize, DataTypes) => {
  const { STRING, FLOAT, TEXT } = DataTypes;

  const Model = sequelize.define('Cashier', {
    dateToShow: {
      type: STRING,
    },

    timestampText: {
      type: STRING,
    },

    operations: {
      allowNull: false,
      type: TEXT,
    },

    initialMoneyCashier: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    totalIncome: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    totalOutcome: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    totalProfit: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
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

module.exports = CashierModel;
