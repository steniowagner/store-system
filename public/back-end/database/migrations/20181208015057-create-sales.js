const onMigrate = (queryInterface, DataTypes) => {
  const {
    INTEGER,
    STRING,
    FLOAT,
    DATE,
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

    dateToShow: {
      type: STRING,
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
