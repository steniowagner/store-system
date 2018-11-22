const onMigrate = (queryInterface, DataTypes) => {
  const {
    INTEGER,
    BOOLEAN,
    STRING,
    FLOAT,
    DATE,
    TEXT,
    JSON,
  } = DataTypes;

  queryInterface.createTable('Sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },

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

const onRollback = queryInterface => queryInterface.dropTable('Sales');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
