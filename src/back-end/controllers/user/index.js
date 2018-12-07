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
    return err;
  }
};

exports.edit = async (userUpdated) => {
  try {
    await User.update({
      ...userUpdated,
    }, {
      where: {
        id: userUpdated.id,
      },
    });

    const users = await User.findAll({ raw: true });
    const userEditedIndex = users.findIndex(user => user.id === userUpdated.id);

    return {
      userEdited: users[userEditedIndex],
      index: userEditedIndex,
    };
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
