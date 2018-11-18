const CustomerModel = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;

  const Model = sequelize.define('Customer', {
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
      unique: true,
    },

    rg: {
      type: STRING,
      unique: true,
    },

    email: {
      type: STRING,
      unique: true,
    },
  });

  return Model;
};

module.exports = CustomerModel;
