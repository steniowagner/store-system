const ProviderModel = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;

  const Model = sequelize.define('Provider', {
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
  });

  return Model;
};

module.exports = ProviderModel;
