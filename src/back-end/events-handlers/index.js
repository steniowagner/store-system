const ENTITIES = require('../../common/entitiesTypes');

const handleCustomerEvents = require('./customer');
const handleProviderEvents = require('./provider');
const handleProductEvents = require('./product');
const handlerStockEvents = require('./stock');
const handleUserEvents = require('./user');
const handleBrandEvents = require('./brand');
const handleSaleEvents = require('./sale');

const eventHandler = (entitie, operation, args) => {
  switch (entitie) {
    case ENTITIES.CUSTOMER: return handleCustomerEvents(operation, args);

    case ENTITIES.PROVIDER: return handleProviderEvents(operation, args);

    case ENTITIES.USER: return handleUserEvents(operation, args);

    case ENTITIES.STOCK: return handlerStockEvents(operation, args);

    case ENTITIES.BRAND: return handleBrandEvents(operation, args);

    case ENTITIES.PRODUCT: return handleProductEvents(operation, args);

    case ENTITIES.SALE: return handleSaleEvents(operation, args);

    default: return {};
  }
};

module.exports = eventHandler;
