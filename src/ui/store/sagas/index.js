import { all, takeLatest } from 'redux-saga/effects';

import { Types as UserTypes } from '../ducks/user';

import {
  createUser,
  getAllUsers,
  editUser,
  removeUser,
} from './user';

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.CREATE_REQUEST, createUser),
    takeLatest(UserTypes.GET_ALL_REQUEST, getAllUsers),
    takeLatest(UserTypes.EDIT_REQUEST, editUser),
    takeLatest(UserTypes.REMOVE_REQUEST, removeUser),
  ]);
}
