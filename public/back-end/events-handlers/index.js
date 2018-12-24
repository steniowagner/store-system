const ENTITIES = require('../entitiesTypes');

const handlerBackupEvents = require('./backup');
const handleCustomerEvents = require('./customer');
const handleProviderEvents = require('./provider');
const handleCashierEvents = require('./cashier');
const handleProductEvents = require('./product');
const handleBudgetEvents = require('./budget');
const handlerStockEvents = require('./stock');
const handleBrandEvents = require('./brand');
const handleUserEvents = require('./user');
const handleSaleEvents = require('./sale');

const eventHandler = (entitie, operation, args) => {
  switch (entitie) {
    case ENTITIES.CUSTOMER: return handleCustomerEvents(operation, args);

    case ENTITIES.PROVIDER: return handleProviderEvents(operation, args);

    case ENTITIES.CASHIER: return handleCashierEvents(operation, args);

    case ENTITIES.PRODUCT: return handleProductEvents(operation, args);

    case ENTITIES.BUDGET: return handleBudgetEvents(operation, args);

    case ENTITIES.BACKUP: return handlerBackupEvents(operation, args);

    case ENTITIES.STOCK: return handlerStockEvents(operation, args);

    case ENTITIES.BRAND: return handleBrandEvents(operation, args);

    case ENTITIES.USER: return handleUserEvents(operation, args);

    case ENTITIES.SALE: return handleSaleEvents(operation, args);

    default: return {};
  }
};

module.exports = eventHandler;
