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
      order: [['updatedAt', 'DESC']],
      include: [Brand],
      raw: true,
    });
  } catch (err) {
    return [];
  }
};

exports.edit = async (productUpdated) => {
  try {
    return await Product.update({
      ...productUpdated,
    }, {
      where: {
        id: productUpdated.id,
      },
    });
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
