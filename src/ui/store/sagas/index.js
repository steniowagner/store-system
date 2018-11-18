import { all, takeLatest } from 'redux-saga/effects';

import { Types as CustomerTypes } from '../ducks/customer';
import { Types as ProviderTypes } from '../ducks/provider';
import { Types as UserTypes } from '../ducks/user';

import {
  unsubscribeUserEvents,
  createUser,
  getAllUsers,
  editUser,
  removeUser,
} from './user';

import {
  unsubscribeCustomerEvents,
  createCustomer,
  getAllCustomers,
  editCustomer,
  removeCustomer,
} from './customer';

import {
  unsubscribeProviderEvents,
  createProvider,
  getAllProviders,
  editProvider,
  removeProvider,
} from './provider';

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.UNSUBSCRIBE_EVENTS, unsubscribeUserEvents),
    takeLatest(UserTypes.CREATE_REQUEST, createUser),
    takeLatest(UserTypes.GET_ALL_REQUEST, getAllUsers),
    takeLatest(UserTypes.EDIT_REQUEST, editUser),
    takeLatest(UserTypes.REMOVE_REQUEST, removeUser),

    takeLatest(ProviderTypes.UNSUBSCRIBE_EVENTS, unsubscribeProviderEvents),
    takeLatest(ProviderTypes.CREATE_REQUEST, createProvider),
    takeLatest(ProviderTypes.GET_ALL_REQUEST, getAllProviders),
    takeLatest(ProviderTypes.EDIT_REQUEST, editProvider),
    takeLatest(ProviderTypes.REMOVE_REQUEST, removeProvider),

    takeLatest(CustomerTypes.UNSUBSCRIBE_EVENTS, unsubscribeCustomerEvents),
    takeLatest(CustomerTypes.CREATE_REQUEST, createCustomer),
    takeLatest(CustomerTypes.GET_ALL_REQUEST, getAllCustomers),
    takeLatest(CustomerTypes.EDIT_REQUEST, editCustomer),
    takeLatest(CustomerTypes.REMOVE_REQUEST, removeCustomer),
  ]);
}
