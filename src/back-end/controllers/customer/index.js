const { Customer } = require('../../models');

exports.create = async (args) => {
  try {
    const customer = await Customer.create(args);

    return customer.id;
  } catch (err) {
    return err;
  }
};

exports.getAll = async () => {
  try {
    return await Customer.findAll({ raw: true, order: [['updatedAt', 'DESC']] });
  } catch (err) {
    return [];
  }
};

exports.edit = async (customerUpdated) => {
  try {
    return await Customer.update({
      ...customerUpdated,
    }, {
      where: {
        id: customerUpdated.id,
      },
    });
  } catch (err) {
    return err;
  }
};

exports.remove = async (id) => {
  try {
    return await Customer.destroy({ where: { id } });
  } catch (err) {
    return err;
  }
};
