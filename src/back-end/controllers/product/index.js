const { Product, Brand } = require('../../models');

exports.create = async (args) => {
  try {
    const product = await Product.create(args);

    return product.id;
  } catch (err) {
    return err;
  }
};

exports.getAll = async () => {
  try {
    return await Product.findAll({
      include: [Brand],
      raw: true,
    });
  } catch (err) {
    return err;
  }
};

exports.edit = async (productUpdated) => {
  try {
    await Product.update({
      ...productUpdated,
    }, {
      where: {
        id: productUpdated.id,
      },
    });

    const products = await Product.findAll({ raw: true });
    const customerEditedIndex = products.findIndex(product => product.id === productUpdated.id);

    return {
      customerEdited: products[customerEditedIndex],
      index: customerEditedIndex,
    };
  } catch (err) {
    return err;
  }
};

exports.remove = async (id) => {
  try {
    return await Product.destroy({ where: { id } });
  } catch (err) {
    return err;
  }
};
