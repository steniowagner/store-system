const { Sale } = require('../../models');

exports.create = async (args) => {
  try {
    const sale = await Sale.create(args);

    return sale.id;
  } catch (err) {
    return err;
  }
};

exports.getAll = async () => {
  try {
    return await Sale.findAll({ raw: true, order: [['updatedAt', 'DESC']] });
  } catch (err) {
    return [];
  }
};

exports.getById = async (id) => {
  try {
    return await Sale.findOne({
      raw: true,
    }, {
      where: {
        id,
      },
    });
  } catch (err) {
    return err;
  }
};

exports.edit = async (saleUpdated) => {
  try {
    return await Sale.update({
      ...saleUpdated,
    }, {
      where: {
        id: saleUpdated.id,
      },
    });
  } catch (err) {
    return err;
  }
};
