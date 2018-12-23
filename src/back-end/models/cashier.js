const CashierModel = (sequelize, DataTypes) => {
  const { STRING, FLOAT, TEXT } = DataTypes;

  const Model = sequelize.define('Cashier', {
    dateToShow: {
      type: STRING,
    },

    timestampText: {
      type: STRING,
    },

    openBy: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    closedBy: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
  });

  return Model;
};

module.exports = CashierModel;
