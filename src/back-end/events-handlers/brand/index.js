const brandController = require('../../controllers/brand');
const BRAND_OPERATIONS = require('./types');

const handleProviderEvent = (operation, args) => {
  switch (operation) {
    case BRAND_OPERATIONS.CREATE_BRAND: return brandController.createBrand(args);

    case BRAND_OPERATIONS.READ_BRANDS: return brandController.getAllBrands();

    default: return {};
  }
};

module.exports = handleProviderEvent;
