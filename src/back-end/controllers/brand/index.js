const { Brand } = require('../../models');

exports.createBrand = async (brands) => {
  try {
    await Promise.all(brands.map(async brand => Brand.create(brand)));

    return await Brand.findAll({ raw: true });
  } catch (err) {
    return err;
  }
};

exports.getAllBrands = async () => {
  try {
    return await Brand.findAll({ raw: true });
  } catch (err) {
    return err;
  }
};
