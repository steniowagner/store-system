import { select, call, put } from 'redux-saga/effects';

import moment from 'moment';
import 'moment/locale/pt-br';

import { CASHIER_OPERATIONS } from '../../screens/cashier/components/current-cashier/components/cashier-open/components/top-buttons-values/dialog-config';
import { CREATE_CASHIER, UPDATE_CASHIER, READ_CASHIER } from '../../../back-end/events-handlers/cashier/types';
import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, CASHIER } from '../../../common/entitiesTypes';
import { calculateTotalProfit, parseSaleTableItem } from '../../screens/cashier/cashier-utils';
import { Creators as CashierCreators } from '../ducks/cashier';
import { Creators as SaleCreators } from '../ducks/sale';

const { ipcRenderer } = window.require('electron');

const EVENT_TAGS = {
  CREATE_CASHIER: 'CASHIER_CREATE',
  UPDATE_CASHIER: 'CASHIER_UPDATE',
  READ_CASHIERS: 'CASHIERS_READ',
};

export function* createCashier(action) {
  try {
    moment.locale('pt-br');

    const { args } = action;

    const initialCashier = {
      initialMoneyCashier: parseFloat(args),
      timestampText: moment().calendar(),
      dateToShow: moment().format('LL'),
      totalOutcome: parseFloat(0),
      totalIncome: parseFloat(0),
      totalProfit: parseFloat(0),
      salesman: 'steniowagner',
      operations: '',
    };

    ipcRenderer.send(OPERATION_REQUEST, CASHIER, CREATE_CASHIER, EVENT_TAGS.CREATE_CASHIER, initialCashier);

    const { result } = yield handleEventSubscription(EVENT_TAGS.CREATE_CASHIER);

    const newCashier = {
      ...initialCashier,
      operations: [],
      id: result,
    };

    yield put(CashierCreators.createCashierSuccess(newCashier));
  } catch (err) {
    yield put(CashierCreators.createCashierFailure(err.message));
  }
}

export function* editCashier(action) {
  try {
    const { cashier } = action.payload;

    const cashierUpdated = {
      ...cashier,
      operations: JSON.stringify(cashier.operations),
      totalOutcome: parseFloat(cashier.totalOutcome),
      totalIncome: parseFloat(cashier.totalIncome),
      totalProfit: parseFloat(cashier.totalProfit),
    };

    ipcRenderer.send(OPERATION_REQUEST, CASHIER, UPDATE_CASHIER, EVENT_TAGS.UPDATE_CASHIER, cashierUpdated);

    yield handleEventSubscription(EVENT_TAGS.UPDATE_CASHIER);
    yield put(CashierCreators.editCashierSuccess(cashierUpdated));
  } catch (err) {
    yield put(CashierCreators.editCashierFailure(err.message));
  }
}

const getTotalProfit = (operations) => {
  const saleOperations = operations.filter((operation) => {
    return (operation.type === CASHIER_OPERATIONS.SALE || operation.type === CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT);
  });

  const totalProfit = calculateTotalProfit(saleOperations);

  return totalProfit;
};

export function* onAddSaleOperation(newSale) {
  const { currentCashier } = yield select(state => state.cashier);
  const { operations } = currentCashier;

  const saleParsedToTableView = parseSaleTableItem(newSale);
  const operationsUpdated = [saleParsedToTableView, ...operations];
  const totalProfit = getTotalProfit(operationsUpdated);

  const payload = {
    cashier: {
      ...currentCashier,
      operations: operationsUpdated,
      totalProfit,
    },
  };

  yield call(editCashier, { payload });
}

export function* onEditSaleOperation(saleUpdated) {
  const { currentCashier } = yield select(state => state.cashier);
  const { operations } = currentCashier;

  const saleParsedToTableView = parseSaleTableItem(saleUpdated);

  const operationsUpdated = operations.map((operation) => {
    const isOperationTypeSale = (operation.type === CASHIER_OPERATIONS.SALE
      || operation.type === CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT);

    const isSaleUpdated = (isOperationTypeSale && operation.id === saleUpdated.id);

    return (isSaleUpdated ? saleParsedToTableView : operation);
  });

  const totalProfit = getTotalProfit(operationsUpdated);

  const payload = {
    cashier: {
      ...currentCashier,
      operations: operationsUpdated,
      totalProfit,
    },
  };

  yield call(editCashier, { payload });
}

export const unsubscribeCashierEvents = () => handleEventUnsubscription(EVENT_TAGS);
