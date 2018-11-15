const onMigrate = (queryInterface, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes;

  queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    name: {
      allowNull: false,
      type: STRING,
    },
    username: {
      allowNull: false,
      type: STRING,
      unique: true,
    },
    password: {
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

const onRollback = queryInterface => queryInterface.dropTable('Users');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
