const { Product, Stock } = require('../../models');

exports.getAll = async () => {
  try {
    return await Stock.findAll({
      order: [['updatedAt', 'DESC']],
      include: [Product],
      raw: true,
    });
  } catch (err) {
    return [];
  }
};

exports.insert = async (productInfo) => {
  try {
    return await Stock.create(productInfo);
  } catch (err) {
    return err;
  }
};

exports.editInBatch = async (stockUpdated) => {
  try {
    stockUpdated.forEach(async (stockItem) => {
      await Stock.update({
        ...stockItem,
      }, {
        where: {
          id: stockItem.id,
        },
      });
    });

    return null;
  } catch (err) {
    return err;
  }
};

exports.edit = async (productInfoUpdated) => {
  try {
    return await Stock.update({
      ...productInfoUpdated,
    }, {
      where: {
        id: productInfoUpdated.id,
      },
    });
  } catch (err) {
    return err;
  }
};
