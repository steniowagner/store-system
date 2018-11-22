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
    return await Sale.findAll({ raw: true });
  } catch (err) {
    return err;
  }
};

exports.edit = async (saleUpdated) => {
  try {
    await Sale.update({
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
