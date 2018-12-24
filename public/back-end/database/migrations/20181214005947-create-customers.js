const onMigrate = (queryInterface, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes;

  queryInterface.createTable('Customers', {
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

    birthday: {
      type: STRING,
    },

    address: {
      type: STRING,
    },

    neighborhood: {
      type: STRING,
    },

    obs: {
      type: STRING,
    },

    city: {
      type: STRING,
    },

    state: {
      type: STRING,
    },

    motherName: {
      type: STRING,
    },

    fatherName: {
      type: STRING,
    },

    landline: {
      type: STRING,
    },

    cellPhone: {
      type: STRING,
    },

    cpf: {
      type: STRING,
    },

    rg: {
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

const onRollback = queryInterface => queryInterface.dropTable('Customers');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
