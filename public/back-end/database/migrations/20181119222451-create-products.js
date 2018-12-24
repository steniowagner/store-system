const onMigrate = (queryInterface, DataTypes) => {
  const {
    INTEGER,
    STRING,
    FLOAT,
    DATE,
  } = DataTypes;

  queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },

    BrandId: {
      type: INTEGER,
      references: { model: 'Brands', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },

    barcode: {
      allowNull: false,
      type: STRING,
    },

    description: {
      allowNull: false,
      type: STRING,
    },

    costPrice: {
      allowNull: false,
      type: FLOAT,
    },

    salePrice: {
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

const onRollback = queryInterface => queryInterface.dropTable('Products');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
