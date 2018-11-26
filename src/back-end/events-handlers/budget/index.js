const budgetController = require('../../controllers/budget');
const BUDGET_OPERATIONS = require('./types');

const handleBudgetEvent = (operation, args) => {
  switch (operation) {
    case BUDGET_OPERATIONS.CREATE_BUDGET: return budgetController.create(args);

    case BUDGET_OPERATIONS.READ_BUDGETS: return budgetController.readAll();

    case BUDGET_OPERATIONS.UPDATE_BUDGET: return budgetController.update(args);

    case BUDGET_OPERATIONS.DELETE_BUDGET: return budgetController.remove(args);

    default: return {};
  }
};

module.exports = handleBudgetEvent;
