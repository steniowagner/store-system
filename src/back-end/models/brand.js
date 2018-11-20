const BrandModel = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;

  const Model = sequelize.define('Brand', {
    name: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },
  });

  return Model;
};

module.exports = BrandModel;
