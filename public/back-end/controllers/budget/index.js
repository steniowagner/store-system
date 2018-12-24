const { Budget } = require('../../models');

exports.create = async (args) => {
  try {
    const budget = await Budget.create(args);

    return budget.id;
  } catch (err) {
    return err;
  }
};

exports.readAll = async () => {
  try {
    return await Budget.findAll({ raw: true, order: [['updatedAt', 'DESC']] });
  } catch (err) {
    return [];
  }
};

exports.update = async (budgetUpdated) => {
  const { id } = budgetUpdated;

  try {
    return await Budget.update({ ...budgetUpdated }, { where: { id } });
  } catch (err) {
    return err;
  }
};

exports.remove = async (id) => {
  try {
    return await Budget.destroy({ where: { id } });
  } catch (err) {
    return err;
  }
};
