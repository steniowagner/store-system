import { put } from 'redux-saga/effects';

import { Creators as CustomerCreators } from '../ducks/customer';

import {
  CREATE,
  READ,
  UPDATE,
  DELETE,
} from '../../../back-end/events-handlers/customer/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, CUSTOMER } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

export function* createCustomer(action) {
  try {
    const { args } = action;

    ipcRenderer.send(OPERATION_REQUEST, CUSTOMER, CREATE, args);

    const { result } = yield handleEventSubscription(CUSTOMER);

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
    ipcRenderer.send(OPERATION_REQUEST, CUSTOMER, READ);

    const { result } = yield handleEventSubscription(CUSTOMER);

    yield put(CustomerCreators.getAllCustomersSuccess(result));
  } catch (err) {
    yield put(CustomerCreators.getAllCustomersFailure(err.message));
  }
}

export function* editCustomer(action) {
  try {
    const { customer } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, CUSTOMER, UPDATE, customer);

    const { result } = yield handleEventSubscription(CUSTOMER);

    yield put(CustomerCreators.editCustomerSuccess(result));
  } catch (err) {
    yield put(CustomerCreators.editCustomerFailure(err.message));
  }
}

export function* removeCustomer(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, CUSTOMER, DELETE, id);

    yield handleEventSubscription(CUSTOMER);

    yield put(CustomerCreators.removeCustomerSuccess(id));
  } catch (err) {
    yield put(CustomerCreators.removeCustomerFailure(err.message));
  }
}

export const unsubscribeCustomerEvents = () => handleEventUnsubscription(CUSTOMER);
