const { Cashier } = require('../../models');

exports.importFromBackupFile = async (data) => {
  try {
    return await Promise.all(data.map(async cashier => Cashier.create(cashier)));
  } catch (err) {
    return err;
  }
};

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
    return err;
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
