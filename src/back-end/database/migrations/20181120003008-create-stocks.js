const onMigrate = (queryInterface, DataTypes) => {
  const { INTEGER, DATE } = DataTypes;

  queryInterface.createTable('Stocks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },

    ProductId: {
      type: INTEGER,
      references: { model: 'Products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },

    stockQuantity: {
      allowNull: false,
      type: INTEGER,
    },

    minStockQuantity: {
      allowNull: false,
      type: INTEGER,
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

const onRollback = queryInterface => queryInterface.dropTable('Stocks');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
