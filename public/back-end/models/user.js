const UserModel = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;

  const Model = sequelize.define('User', {
    username: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
      unique: true,
    },

    name: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    password: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },
  });

  return Model;
};

module.exports = UserModel;
