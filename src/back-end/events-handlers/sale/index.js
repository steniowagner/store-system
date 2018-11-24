const saleController = require('../../controllers/sale');
const SALES_OPERATION_TYPES = require('./types');

const handleSaleEvent = (operation, args) => {
  switch (operation) {
    case SALES_OPERATION_TYPES.CREATE_SALE: return saleController.create(args);

    case SALES_OPERATION_TYPES.READ_SALES: return saleController.getAll();

    case SALES_OPERATION_TYPES.READ_SALE_BY_ID: return saleController.getById(args);

    case SALES_OPERATION_TYPES.UPDATE_SALE: return saleController.edit(args);

    default: return {};
  }
};

module.exports = handleSaleEvent;
