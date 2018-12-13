
import { call, put } from 'redux-saga/effects';
import { Creators as CustomerDebitsCreators } from '../ducks/customerDebits';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { READ_SALES, UPDATE_SALE } from '../../../back-end/events-handlers/sale/types';
import { OPERATION_REQUEST, SALE } from '../../../common/entitiesTypes';
import { getNumberCustomersInDebit } from './alerts';

const { ipcRenderer } = window.require('electron');

const EVENT_TAGS = {
  GET_ALL_DEBITS: 'CUSTOMER_GET_ALL_DEBITS',
  REMOVE_DEBIT: 'CUSTOMER_REMOVE_DEBIT',
};

export function* getCustomerDebits(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, SALE, READ_SALES, EVENT_TAGS.GET_ALL_DEBITS);
    const { result } = yield handleEventSubscription(EVENT_TAGS.GET_ALL_DEBITS);
    handleEventUnsubscription(EVENT_TAGS.GET_ALL_DEBITS);

    const userSalesWithDebits = result.filter(sale => (sale.customer.id === id && sale.inDebit > 0));

    yield put(CustomerDebitsCreators.getDebitsSuccess(userSalesWithDebits));
  } catch (err) {
    yield put(CustomerDebitsCreators.getDebitsFailure(err.message));
  }
}

export function* removeDebit(action) {
  try {
    const { sale } = action.payload;

    const saleWithoutDebit = {
      ...sale,
      inDebit: 0,
    };

    ipcRenderer.send(OPERATION_REQUEST, SALE, UPDATE_SALE, EVENT_TAGS.REMOVE_DEBIT, saleWithoutDebit);
    yield handleEventSubscription(EVENT_TAGS.REMOVE_DEBIT);
    handleEventUnsubscription(EVENT_TAGS.REMOVE_DEBIT);

    yield put(CustomerDebitsCreators.removeDebitSuccess(sale.id));
    yield call(getNumberCustomersInDebit);
  } catch (err) {
    yield put(CustomerDebitsCreators.removeDebitFailure(err.message));
  }
}
