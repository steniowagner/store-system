const customerController = require('../../controllers/customer');
const CUSTOMER_OPERATION_TYPES = require('./types');

const handleProviderEvent = (operation, args) => {
  switch (operation) {
    case CUSTOMER_OPERATION_TYPES.CREATE: return customerController.create(args);

    case CUSTOMER_OPERATION_TYPES.READ: return customerController.getAll();

    case CUSTOMER_OPERATION_TYPES.UPDATE: return customerController.edit(args);

    case CUSTOMER_OPERATION_TYPES.DELETE: return customerController.remove(args);

    default: return {};
  }
};

module.exports = handleProviderEvent;
