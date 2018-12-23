const onMigrate = (queryInterface, DataTypes) => {
  const {
    INTEGER,
    STRING,
    FLOAT,
    DATE,
    JSON,
  } = DataTypes;

  queryInterface.createTable('Cashiers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },

    openBy: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    closedBy: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    dateToShow: {
      type: STRING,
    },

    timestampText: {
      type: STRING,
    },

    operations: {
      allowNull: false,
      type: JSON,
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
