const providerController = require('../../controllers/provider');
const PROVIDER_OPERATION_TYPES = require('./types');

const handleProviderEvent = (operation, args) => {
  switch (operation) {
    case PROVIDER_OPERATION_TYPES.CREATE: return providerController.create(args);

    case PROVIDER_OPERATION_TYPES.READ: return providerController.getAll();

    case PROVIDER_OPERATION_TYPES.UPDATE: return providerController.edit(args);

    case PROVIDER_OPERATION_TYPES.DELETE: return providerController.remove(args);

    default: return {};
  }
};

module.exports = handleProviderEvent;
