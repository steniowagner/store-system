const onMigrate = (queryInterface, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes;

  queryInterface.createTable('Providers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },

    name: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    address: {
      type: STRING,
    },

    neighborhood: {
      type: STRING,
    },

    city: {
      type: STRING,
    },

    state: {
      type: STRING,
    },

    phone1: {
      type: STRING,
    },

    phone2: {
      type: STRING,
    },

    email: {
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

const onRollback = queryInterface => queryInterface.dropTable('Providers');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
