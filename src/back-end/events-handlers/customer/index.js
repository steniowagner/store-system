const customerController = require('../../controllers/customer');
const CUSTOMER_OPERATION_TYPES = require('./types');

const handleProviderEvent = (operation, args) => {
  switch (operation) {
    case CUSTOMER_OPERATION_TYPES.CREATE_CUSTOMER: return customerController.create(args);

    case CUSTOMER_OPERATION_TYPES.READ_CUSTOMERS: return customerController.getAll();

    case CUSTOMER_OPERATION_TYPES.UPDATE_CUSTOMER: return customerController.edit(args);

    case CUSTOMER_OPERATION_TYPES.DELETE_CUSTOMER: return customerController.remove(args);

    default: return {};
  }
};

module.exports = handleProviderEvent;
