import { put } from 'redux-saga/effects';

import { Creators as BudgetCreators } from '../ducks/budget';

import {
  CREATE,
  READ,
  UPDATE,
  DELETE,
} from '../../../back-end/events-handlers/user/types';

import { OPERATION_REQUEST, BUDGET } from '../../../common/entitiesTypes';
import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';

const { ipcRenderer } = window.require('electron');

export function* createBudget(action) {
  try {
    const { args } = action;

    ipcRenderer.send(OPERATION_REQUEST, BUDGET, CREATE, args);

    const { result } = yield handleEventSubscription(BUDGET);

    const newBudget = {
      ...args,
      id: result,
    };

    yield put(BudgetCreators.createBudgetSuccess(newBudget));
  } catch (err) {
    yield put(BudgetCreators.createBudgetFailure(err.message));
  }
}

export function* getAllBudgets() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, BUDGET, READ);

    const { result } = yield handleEventSubscription(BUDGET);

    yield put(BudgetCreators.getAllBudgetsSuccess(result));
  } catch (err) {
    yield put(BudgetCreators.getAllBudgetsFailure(err));
  }
}

export function* editBudget(action) {
  try {
    const { user } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, BUDGET, UPDATE, user);

    const { result } = yield handleEventSubscription(BUDGET);

    yield put(BudgetCreators.editBudgetSuccess(result));
  } catch (err) {
    yield put(BudgetCreators.editBudgetFailure(err));
  }
}

export function* removeBudget(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, BUDGET, DELETE, id);

    yield handleEventSubscription(BUDGET);

    yield put(BudgetCreators.removeBudgetSuccess(id));
  } catch (err) {
    yield put(BudgetCreators.removeBudgetFailure());
  }
}

export const unsubscribeBudgetEvents = () => handleEventUnsubscription(BUDGET);
