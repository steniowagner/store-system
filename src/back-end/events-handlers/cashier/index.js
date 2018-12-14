const cashierController = require('../../controllers/cashier');
const CASHIER_OPERATIONS = require('./types');

const handleBudgetEvent = (operation, args) => {
  switch (operation) {
    case CASHIER_OPERATIONS.CREATE_CASHIER: return cashierController.create(args);

    case CASHIER_OPERATIONS.READ_CASHIERS: return cashierController.readAll();

    case CASHIER_OPERATIONS.UPDATE_CASHIER: return cashierController.update(args);

    default: return {};
  }
};

module.exports = handleBudgetEvent;
