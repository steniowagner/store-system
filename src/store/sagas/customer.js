import { call, put } from 'redux-saga/effects';

import { Creators as CustomerCreators } from '../ducks/customer';
import { Creators as AlertsCreators } from '../ducks/alerts';

import {
  CREATE_CUSTOMER,
  READ_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
} from './event-handlers-types/customer';

import { READ_SALES } from './event-handlers-types/sale';
import { CUSTOMER, SALE } from './entitiesTypes';
import execRequest from './execRequest';

const EVENT_TAGS = {
  GET_ALL_DEBITS: 'GET_ALL_DEBITS',
  READ_ALL: 'CUSTOMERS_READ_ALL',
  CREATE_CUSTOMER: 'CUSTOMER_CREATE',
  UPDATE_CUSTOMER: 'CUSTOMER_UPDATE',
  REMOVE_CUSTOMER: 'CUSTOMER_REMOVE',
};

export function* createCustomer(action) {
  try {
    const { args } = action;

    const result = yield call(execRequest, CUSTOMER, CREATE_CUSTOMER, EVENT_TAGS.CREATE_CUSTOMER, args);

    const newCustomer = {
      ...args,
      id: result,
    };

    yield put(CustomerCreators.createCustomerSuccess(newCustomer));
  } catch (err) {
    yield put(CustomerCreators.createCustomerFailure());
  }
}

const isCustomerInDebit = (customer, sales) => {
  const isCustomerWithDebit = sales.some(sale => (sale.customer.id === customer.id && sale.inDebit > 0));

  return isCustomerWithDebit;
};

export function* getAllCustomers() {
  try {
    const allCustomers = yield call(execRequest, CUSTOMER, READ_CUSTOMERS, EVENT_TAGS.READ_ALL);
    const sales = yield call(execRequest, SALE, READ_SALES, EVENT_TAGS.GET_ALL_DEBITS);

    const customers = allCustomers.map(customer => ({ ...customer, isInDebit: isCustomerInDebit(customer, sales) }));

    yield put(CustomerCreators.getAllCustomersSuccess(customers));
  } catch (err) {
    yield put(CustomerCreators.getAllCustomersFailure());
  }
}

export function* editCustomer(action) {
  try {
    const { customer } = action.payload;

    yield call(execRequest, CUSTOMER, UPDATE_CUSTOMER, EVENT_TAGS.UPDATE_CUSTOMER, customer);

    yield put(CustomerCreators.editCustomerSuccess(customer));
  } catch (err) {
    yield put(CustomerCreators.editCustomerFailure());
  }
}

export function* removeCustomer(action) {
  try {
    const { id } = action.payload;

    yield call(execRequest, CUSTOMER, DELETE_CUSTOMER, EVENT_TAGS.REMOVE_CUSTOMER, id);
    yield put(CustomerCreators.removeCustomerSuccess(id));
    yield put(AlertsCreators.getNumberCustomersInDebit());
  } catch (err) {
    yield put(CustomerCreators.removeCustomerFailure());
  }
}
