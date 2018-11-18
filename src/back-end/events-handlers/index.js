const ENTITIES = require('../../common/entitiesTypes');

const handleCustomerEvents = require('./customer');
const handleProviderEvents = require('./provider');
const handleUserEvents = require('./user');

const eventHandler = (entitie, operation, args) => {
  switch (entitie) {
    case ENTITIES.CUSTOMER: return handleCustomerEvents(operation, args);

    case ENTITIES.PROVIDER: return handleProviderEvents(operation, args);

    case ENTITIES.USER: return handleUserEvents(operation, args);

    default: return {};
  }
};

module.exports = eventHandler;
