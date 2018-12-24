const onMigrate = (queryInterface, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes;

  queryInterface.createTable('Brands', {
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
      unique: true,
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

const onRollback = queryInterface => queryInterface.dropTable('Brands');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
