const providerController = require('../../controllers/provider');
const PROVIDER_OPERATION_TYPES = require('./types');

const handleProviderEvent = (operation, args) => {
  switch (operation) {
    case PROVIDER_OPERATION_TYPES.CREATE_PROVIDER: return providerController.create(args);

    case PROVIDER_OPERATION_TYPES.READ_PROVIDERS: return providerController.getAll();

    case PROVIDER_OPERATION_TYPES.UPDATE_PROVIDER: return providerController.edit(args);

    case PROVIDER_OPERATION_TYPES.DELETE_PROVIDER: return providerController.remove(args);

    default: return {};
  }
};

module.exports = handleProviderEvent;
