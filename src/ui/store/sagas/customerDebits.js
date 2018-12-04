
import { put } from 'redux-saga/effects';
import { Creators as CustomerDebitsCreators } from '../ducks/customerDebits';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { READ_SALES } from '../../../back-end/events-handlers/sale/types';
import { OPERATION_REQUEST, SALE } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

export function* getCustomerDebits(action) {
  try {
    const { id } = action.payload;

    const EVENT_TAG = 'CUSTOMER_GET_ALL_DEBITS';

    ipcRenderer.send(OPERATION_REQUEST, SALE, READ_SALES, EVENT_TAG);

    const { result } = yield handleEventSubscription(EVENT_TAG);

    handleEventUnsubscription({ EVENT_TAG });

    const userSalesWithDebits = result.filter(sale => (sale.customer.id === id && sale.inDebit > 0));

    yield put(CustomerDebitsCreators.getDebitsSuccess(userSalesWithDebits));
  } catch (err) {
    yield put(CustomerDebitsCreators.getDebitsFailure(err.message));
  }
}
