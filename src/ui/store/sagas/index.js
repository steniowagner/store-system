import { all, takeLatest } from 'redux-saga/effects';

import { Types as ProviderTypes } from '../ducks/provider';
import { Types as BudgetTypes } from '../ducks/budget';
import { Types as UserTypes } from '../ducks/user';

import {
  unsubscribeUserEvents,
  createUser,
  getAllUsers,
  editUser,
  removeUser,
} from './user';

import {
  createBudget,
  getAllBudgets,
  editBudget,
  removeBudget,
} from './budget';

import {
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

    takeLatest(ProviderTypes.CREATE_REQUEST, createProvider),
    takeLatest(ProviderTypes.GET_ALL_REQUEST, getAllProviders),
    takeLatest(ProviderTypes.EDIT_REQUEST, editProvider),
    takeLatest(ProviderTypes.REMOVE_REQUEST, removeProvider),

  /*
    takeLatest(BudgetTypes.CREATE_REQUEST, createBudget),
    takeLatest(BudgetTypes.GET_ALL_REQUEST, getAllBudgets),
    takeLatest(BudgetTypes.EDIT_REQUEST, editBudget),
    takeLatest(BudgetTypes.REMOVE_REQUEST, removeBudget),
 */
  ]);
}
