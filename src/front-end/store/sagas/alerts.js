import { put } from 'redux-saga/effects';

import { Creators as AlertCreators } from '../ducks/alerts';
import {
  OPERATION_REQUEST,
  CUSTOMER,
  BUDGET,
  STOCK,
  SALE,
} from '../../../common/entitiesTypes';

import { READ_BUDGETS } from '../../../back-end/events-handlers/budget/types';
import { READ_STOCK } from '../../../back-end/events-handlers/stock/types';
import { READ_SALES } from '../../../back-end/events-handlers/sale/types';
import { READ } from '../../../back-end/events-handlers/customer/types';

import { handleEventSubscription, handleEventUnsubscription } from './eventHandler';
import { BUDGET_STATUS } from '../../screens/budget/components/BudgetStatus';

const { ipcRenderer } = window.require('electron');

const EVENT_TAGS = {
  READ_ALL_BUDGETS_OUTDATED: 'ALERTS_READ_ALL_BUDGETS_OUTDATED',
  READ_ALL_STOCK_UNDER_MIN: 'ALERTS_READ_ALL_STOCK_UNDER_MIN',
  READ_ALL_CUSTOMERS: 'ALERTS_READ_ALL_CUSTOMERS',
  READ_ALL_SALES: 'ALERTS_READ_ALL_SALES',
};

function* getItems(entity, action, tag) {
  ipcRenderer.send(OPERATION_REQUEST, entity, action, tag);
  const { result } = yield handleEventSubscription(tag);
  handleEventUnsubscription(tag);

  return result;
}

export function* getNumberBudgetsOutOfDate() {
  try {
    const budgets = yield getItems(BUDGET, READ_BUDGETS, EVENT_TAGS.READ_ALL_BUDGETS_OUTDATED);
    const numberBudgetsOutOfDate = budgets.reduce((total, { status }) => total + (status === BUDGET_STATUS.OUT_OF_TIME ? 1 : 0), 0);

    yield put(AlertCreators.getNumberBudgetsOutOfDateSuccess(numberBudgetsOutOfDate));
  } catch (err) {
    yield put(AlertCreators.getNumberBudgetsOutOfDateFailure());
  }
}

export function* getNumberCustomersInDebit() {
  try {
    const customers = yield getItems(CUSTOMER, READ, EVENT_TAGS.READ_ALL_CUSTOMERS);
    const sales = yield getItems(SALE, READ_SALES, EVENT_TAGS.READ_ALL_SALES);

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
    const productsInStock = yield getItems(STOCK, READ_STOCK, EVENT_TAGS.READ_ALL_STOCK_UNDER_MIN);
    const numberStockUnderMin = productsInStock.reduce((total, { minStockQuantity, stockQuantity }) => total + (stockQuantity < minStockQuantity ? 1 : 0), 0);

    yield put(AlertCreators.getNumberStockUnderMinSuccess(numberStockUnderMin));
  } catch (err) {
    yield put(AlertCreators.getNumberStockUnderMinFailure());
  }
}
