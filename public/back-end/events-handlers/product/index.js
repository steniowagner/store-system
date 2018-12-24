const productController = require('../../controllers/product');
const PRODUCT_OPERATION = require('./types');

const handleProductEvent = (operation, args) => {
  switch (operation) {
    case PRODUCT_OPERATION.CREATE_PRODUCT: return productController.create(args);

    case PRODUCT_OPERATION.READ_PRODUCTS: return productController.getAll();

    case PRODUCT_OPERATION.UPDATE_PRODUCT: return productController.edit(args);

    case PRODUCT_OPERATION.DELETE_PRODUCT: return productController.remove(args);

    default: return {};
  }
};

module.exports = handleProductEvent;
