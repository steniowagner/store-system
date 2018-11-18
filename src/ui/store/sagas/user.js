import { put } from 'redux-saga/effects';

import { Creators as UserCreators } from '../ducks/user';

import {
  CREATE,
  READ,
  UPDATE,
  DELETE,
} from '../../../back-end/events-handlers/user/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, USER } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

export function* createUser(action) {
  try {
    const { args } = action;

    ipcRenderer.send(OPERATION_REQUEST, USER, CREATE, args);

    const { result } = yield handleEventSubscription(USER);

    const newUser = {
      ...args,
      id: result,
    };

    yield put(UserCreators.createUserSuccess(newUser));
  } catch (err) {
    yield put(UserCreators.createUserFailure(err.message));
  }
}

export function* getAllUsers() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, USER, READ);

    const { result } = yield handleEventSubscription(USER);

    yield put(UserCreators.getAllUsersSuccess(result));
  } catch (err) {
    yield put(UserCreators.getAllUsersFailure(err));
  }
}

export function* editUser(action) {
  try {
    const { user } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, USER, UPDATE, user);

    const { result } = yield handleEventSubscription(USER);

    yield put(UserCreators.editUserSuccess(result));
  } catch (err) {
    yield put(UserCreators.editUserFailure(err));
  }
}

export function* removeUser(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, USER, DELETE, id);

    yield handleEventSubscription(USER);

    yield put(UserCreators.removeUserSuccess(id));
  } catch (err) {
    yield put(UserCreators.removeUserFailure());
  }
}

export const unsubscribeUserEvents = () => handleEventUnsubscription(USER);
