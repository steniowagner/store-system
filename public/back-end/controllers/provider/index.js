const { Provider } = require('../../models');

exports.create = async (args) => {
  try {
    const provider = await Provider.create(args);

    return provider.id;
  } catch (err) {
    return err;
  }
};

exports.getAll = async () => {
  try {
    return await Provider.findAll({ raw: true, order: [['updatedAt', 'DESC']] });
  } catch (err) {
    return [];
  }
};

exports.edit = async (providerUpdated) => {
  try {
    return await Provider.update({
      ...providerUpdated,
    }, {
      where: {
        id: providerUpdated.id,
      },
    });
  } catch (err) {
    return err;
  }
};

exports.remove = async (id) => {
  try {
    return await Provider.destroy({ where: { id } });
  } catch (err) {
    return err;
  }
};
