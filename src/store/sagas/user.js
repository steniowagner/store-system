import { call, put } from 'redux-saga/effects';

import { Creators as UserCreators } from '../ducks/user';

import {
  CREATE_USER,
  READ_USERS,
  UPDATE_USER,
  DELETE_USER,
} from './event-handlers-types/user';

import execRequest from './execRequest';
import { USER } from './entitiesTypes';

const EVENT_TAGS = {
  GET_ALL_USERS: 'USERS_GET_ALL',
  CREATE_USER: 'USER_CREATE',
  REMOVE_USER: 'USER_REMOVE',
  EDIT_USER: 'USER_EDIT',
};

export function* createUser(action) {
  try {
    const { args } = action;

    const result = yield call(execRequest, USER, CREATE_USER, EVENT_TAGS.CREATE_USER, args);

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
    const result = yield call(execRequest, USER, READ_USERS, EVENT_TAGS.GET_ALL_USERS);
    yield put(UserCreators.getAllUsersSuccess(result));
  } catch (err) {
    yield put(UserCreators.getAllUsersFailure(err));
  }
}

export function* editUser(action) {
  try {
    const { user } = action.payload;

    yield call(execRequest, USER, UPDATE_USER, EVENT_TAGS.EDIT_USER, user);
    yield put(UserCreators.editUserSuccess(user));
  } catch (err) {
    yield put(UserCreators.editUserFailure(err));
  }
}

export function* removeUser(action) {
  try {
    const { id } = action.payload;

    yield call(execRequest, USER, DELETE_USER, EVENT_TAGS.REMOVE_USER, id);
    yield put(UserCreators.removeUserSuccess(id));
  } catch (err) {
    yield put(UserCreators.removeUserFailure());
  }
}
