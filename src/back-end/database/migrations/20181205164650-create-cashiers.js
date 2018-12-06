const onMigrate = (queryInterface, DataTypes) => {
  const {
    INTEGER,
    STRING,
    FLOAT,
    DATE,
    TEXT,
  } = DataTypes;

  queryInterface.createTable('Cashiers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },

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

    createdAt: {
      allowNull: false,
      type: DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DATE,
    },
  });
};

const onRollback = queryInterface => queryInterface.dropTable('Cashiers');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
