const ENTITIES = require('../../common/entitiesTypes');

const handleProviderEvents = require('./provider');
const handleUserEvents = require('./user');

const eventHandler = (entitie, operation, args) => {
  switch (entitie) {
    case ENTITIES.USER: return handleUserEvents(operation, args);

    case ENTITIES.PROVIDER: return handleProviderEvents(operation, args);

    default: return {};
  }
};

module.exports = eventHandler;
