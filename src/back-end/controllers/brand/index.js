const { Brand } = require('../../models');

exports.getAllBrands = async () => {
  try {
    return await Brand.findAll({ raw: true });
  } catch (err) {
    return [];
  }
};

exports.createBrands = async ({ brandsCreated, brandSelected }) => {
  try {
    await Promise.all(brandsCreated.map(async brand => Brand.create(brand)));

    const brandCreated = await Brand.findOne({ raw: true, where: { name: brandSelected } });

    return brandCreated;
  } catch (err) {
    return err;
  }
};
