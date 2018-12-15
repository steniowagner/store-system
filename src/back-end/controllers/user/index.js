const { User } = require('../../models');

exports.create = async (args) => {
  try {
    const user = await User.create(args);

    return user.id;
  } catch (err) {
    return err;
  }
};

exports.getAll = async () => {
  try {
    return await User.findAll({ raw: true, order: [['updatedAt', 'DESC']] });
  } catch (err) {
    return [];
  }
};

exports.edit = async (userUpdated) => {
  try {
    return await User.update({
      ...userUpdated,
    }, {
      where: {
        id: userUpdated.id,
      },
    });
  } catch (err) {
    return err;
  }
};

exports.remove = async (id) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (err) {
    return err;
  }
};
