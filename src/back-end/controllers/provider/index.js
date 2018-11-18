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
    return await Provider.findAll({ raw: true });
  } catch (err) {
    return err;
  }
};

exports.edit = async (providerUpdated) => {
  try {
    await Provider.update({
      ...providerUpdated,
    }, {
      where: {
        id: providerUpdated.id,
      },
    });

    const providers = await Provider.findAll({ raw: true });
    const providerEditedIndex = providers.findIndex(provider => provider.id === providerUpdated.id);

    return {
      providerEdited: providers[providerEditedIndex],
      index: providerEditedIndex,
    };
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
