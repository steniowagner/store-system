const ENTITIES = require('../../common/entitiesTypes');
const handleUserEvent = require('./user');

const eventHandler = (entitie, operation, args) => {
  switch (entitie) {
    case ENTITIES.USER: return handleUserEvent(operation, args);

    default: return {};
  }
};

module.exports = eventHandler;
