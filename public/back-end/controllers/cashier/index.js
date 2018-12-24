const { Cashier } = require('../../models');

exports.create = async (args) => {
  try {
    const { id } = await Cashier.create(args);

    return id;
  } catch (err) {
    return err;
  }
};

exports.readAll = async () => {
  try {
    return await Cashier.findAll({ raw: true, order: [['updatedAt', 'DESC']] });
  } catch (err) {
    return [];
  }
};

exports.update = async (budgetUpdated) => {
  try {
    const { id } = budgetUpdated;

    return await Cashier.update({ ...budgetUpdated }, { where: { id } });
  } catch (err) {
    return err;
  }
};
