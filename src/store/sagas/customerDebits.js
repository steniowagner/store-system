
import { call, put } from 'redux-saga/effects';
import { Creators as CustomerDebitsCreators } from '../ducks/customerDebits';

import { READ_SALES, UPDATE_SALE } from './event-handlers-types/sale';
import { getNumberCustomersInDebit } from './alerts';
import execRequest from './execRequest';
import { SALE } from './entitiesTypes';

const EVENT_TAGS = {
  GET_ALL_DEBITS: 'CUSTOMER_GET_ALL_DEBITS',
  REMOVE_DEBIT: 'CUSTOMER_REMOVE_DEBIT',
};

export function* getCustomerDebits(action) {
  try {
    const { id } = action.payload;

    const result = yield call(execRequest, SALE, READ_SALES, EVENT_TAGS.GET_ALL_DEBITS);
    const customerSalesWithDebits = result.filter(sale => (sale.customer.id === id && sale.inDebit > 0));

    yield put(CustomerDebitsCreators.getDebitsSuccess(customerSalesWithDebits));
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

    yield call(execRequest, SALE, UPDATE_SALE, EVENT_TAGS.REMOVE_DEBIT, saleWithoutDebit);
    yield put(CustomerDebitsCreators.removeDebitSuccess(sale.id));
    yield call(getNumberCustomersInDebit);
  } catch (err) {
    yield put(CustomerDebitsCreators.removeDebitFailure(err.message));
  }
}
