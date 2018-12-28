import { call, put } from 'redux-saga/effects';

import { Creators as AlertCreators } from '../ducks/alerts';
import {
  CUSTOMER,
  BUDGET,
  STOCK,
  SALE,
} from './entitiesTypes';

import { BUDGET_STATUS } from '../../screens/budget/components/BudgetStatus';
import { READ_CUSTOMERS } from './event-handlers-types/customer';
import { READ_BUDGETS } from './event-handlers-types/budget';
import { READ_STOCK } from './event-handlers-types/stock';
import { READ_SALES } from './event-handlers-types/sale';
import execRequest from './execRequest';

const EVENT_TAGS = {
  READ_ALL_BUDGETS_OUTDATED: 'ALERTS_READ_ALL_BUDGETS_OUTDATED',
  READ_ALL_STOCK_UNDER_MIN: 'ALERTS_READ_ALL_STOCK_UNDER_MIN',
  READ_ALL_CUSTOMERS: 'ALERTS_READ_ALL_CUSTOMERS',
  READ_ALL_SALES: 'ALERTS_READ_ALL_SALES',
};

export function* getNumberBudgetsOutOfDate() {
  try {
    const budgets = yield call(execRequest, BUDGET, READ_BUDGETS, EVENT_TAGS.READ_ALL_BUDGETS_OUTDATED);
    const numberBudgetsOutOfDate = budgets.reduce((total, { status }) => total + (status === BUDGET_STATUS.OUT_OF_TIME ? 1 : 0), 0);

    yield put(AlertCreators.getNumberBudgetsOutOfDateSuccess(numberBudgetsOutOfDate));
  } catch (err) {
    yield put(AlertCreators.getNumberBudgetsOutOfDateFailure());
  }
}

export function* getNumberCustomersInDebit() {
  try {
    const customers = yield call(execRequest, CUSTOMER, READ_CUSTOMERS, EVENT_TAGS.READ_ALL_CUSTOMERS);
    const sales = yield call(execRequest, SALE, READ_SALES, EVENT_TAGS.READ_ALL_SALES);

    let numberCustomersInDebit = 0;

    const isUserInDebit = (customerId, sale) => (sale.customer.id === customerId) && Boolean(sale.inDebit);
    customers.forEach((customer) => {
      const isUserWithAtLeastOneDebit = sales.some(sale => isUserInDebit(customer.id, sale));
      numberCustomersInDebit += Number(isUserWithAtLeastOneDebit);
    });

    yield put(AlertCreators.getNumberCustomersInDebitSuccess(numberCustomersInDebit));
  } catch (err) {
    yield put(AlertCreators.getNumberCustomersInDebitFailure());
  }
}

export function* getNumberStockUnderMin() {
  try {
    const productsInStock = yield call(execRequest, STOCK, READ_STOCK, EVENT_TAGS.READ_ALL_STOCK_UNDER_MIN);
    const numberStockUnderMin = productsInStock.reduce((total, { minStockQuantity, stockQuantity }) => total + (stockQuantity < minStockQuantity ? 1 : 0), 0);

    yield put(AlertCreators.getNumberStockUnderMinSuccess(numberStockUnderMin));
  } catch (err) {
    yield put(AlertCreators.getNumberStockUnderMinFailure());
  }
}
