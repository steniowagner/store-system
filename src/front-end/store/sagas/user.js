import { put } from 'redux-saga/effects';

import { Creators as UserCreators } from '../ducks/user';

import {
  CREATE_USER,
  READ_USERS,
  UPDATE_USER,
  DELETE_USER,
} from '../../../back-end/events-handlers/user/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, USER } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

const EVENT_TAGS = {
  GET_ALL_USERS: 'USERS_GET_ALL',
  CREATE_USER: 'USER_CREATE',
  REMOVE_USER: 'USER_REMOVE',
  EDIT_USER: 'USER_EDIT',
};

export function* createUser(action) {
  try {
    const { args } = action;

    ipcRenderer.send(OPERATION_REQUEST, USER, CREATE_USER, EVENT_TAGS.CREATE_USER, args);
    const { result } = yield handleEventSubscription(EVENT_TAGS.CREATE_USER);
    handleEventUnsubscription(EVENT_TAGS.CREATE_USER);

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
    ipcRenderer.send(OPERATION_REQUEST, USER, READ_USERS, EVENT_TAGS.GET_ALL_USERS);
    const { result } = yield handleEventSubscription(EVENT_TAGS.GET_ALL_USERS);
    handleEventUnsubscription(EVENT_TAGS.GET_ALL_USERS);

    yield put(UserCreators.getAllUsersSuccess(result));
  } catch (err) {
    yield put(UserCreators.getAllUsersFailure(err));
  }
}

export function* editUser(action) {
  try {
    const { user } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, USER, UPDATE_USER, EVENT_TAGS.EDIT_USER, user);
    yield handleEventSubscription(EVENT_TAGS.EDIT_USER);
    handleEventUnsubscription(EVENT_TAGS.EDIT_USER);

    yield put(UserCreators.editUserSuccess(user));
  } catch (err) {
    yield put(UserCreators.editUserFailure(err));
  }
}

export function* removeUser(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, USER, DELETE_USER, EVENT_TAGS.REMOVE_USER, id);
    yield handleEventSubscription(EVENT_TAGS.REMOVE_USER);
    handleEventUnsubscription(EVENT_TAGS.REMOVE_USER);

    yield put(UserCreators.removeUserSuccess(id));
  } catch (err) {
    yield put(UserCreators.removeUserFailure());
  }
}
