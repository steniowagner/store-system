import { call, put } from 'redux-saga/effects';

import { Creators as CustomerCreators } from '../ducks/customer';

import {
  CREATE_CUSTOMER,
  READ_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
} from '../../../back-end/events-handlers/customer/types';

import { CUSTOMER } from '../../../common/entitiesTypes';
import execRequest from './execRequest';

const EVENT_TAGS = {
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
    yield put(CustomerCreators.createCustomerFailure(err.message));
  }
}

export function* getAllCustomers() {
  try {
    const result = yield call(execRequest, CUSTOMER, READ_CUSTOMERS, EVENT_TAGS.READ_ALL);

    yield put(CustomerCreators.getAllCustomersSuccess(result));
  } catch (err) {
    yield put(CustomerCreators.getAllCustomersFailure(err.message));
  }
}

export function* editCustomer(action) {
  try {
    const { customer } = action.payload;

    yield call(execRequest, CUSTOMER, UPDATE_CUSTOMER, EVENT_TAGS.UPDATE_CUSTOMER, customer);

    yield put(CustomerCreators.editCustomerSuccess(customer));
  } catch (err) {
    yield put(CustomerCreators.editCustomerFailure(err.message));
  }
}

export function* removeCustomer(action) {
  try {
    const { id } = action.payload;

    yield call(execRequest, CUSTOMER, DELETE_CUSTOMER, EVENT_TAGS.REMOVE_CUSTOMER, id);
    yield put(CustomerCreators.removeCustomerSuccess(id));
  } catch (err) {
    yield put(CustomerCreators.removeCustomerFailure(err.message));
  }
}
