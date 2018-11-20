const { Product, Stock } = require('../../models');

exports.getAll = async () => {
  try {
    return await Stock.findAll({
      include: [Product],
      raw: true,
    });
  } catch (err) {
    return err;
  }
};

exports.getById = async (id) => {
  try {
    return await Stock.findOne({ where: { id } });
  } catch (err) {
    return err;
  }
};

exports.insert = async (productInfo) => {
  try {
    return await Stock.create(productInfo);
  } catch (err) {
    return err;
  }
};

exports.edit = async (productInfoUpdated) => {
  try {
    await Stock.update({
      ...productInfoUpdated,
    }, {
      where: {
        id: productInfoUpdated.id,
      },
    });

    const stock = await Stock.findAll({ raw: true });
    const stockItemEditedIndex = stock.findIndex(productInfo => productInfo.id === productInfoUpdated.id);

    return {
      providerEdited: stock[stockItemEditedIndex],
      index: stockItemEditedIndex,
    };
  } catch (err) {
    return err;
  }
};
