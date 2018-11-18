import { put } from 'redux-saga/effects';

import { Creators as ProviderCreators } from '../ducks/provider';

import {
  CREATE,
  READ,
  UPDATE,
  DELETE,
} from '../../../back-end/events-handlers/provider/types';

import { OPERATION_REQUEST, PROVIDER } from '../../../common/entitiesTypes';
import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';

const { ipcRenderer } = window.require('electron');

export function* createProvider(action) {
  try {
    const { args } = action;

    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, CREATE, args);

    const { result } = yield handleEventSubscription(PROVIDER);

    const newProvider = {
      ...args,
      id: result,
    };

    yield put(ProviderCreators.createProviderSuccess(newProvider));
  } catch (err) {
    yield put(ProviderCreators.createProviderFailure(err.message));
  }
}

export function* getAllProviders() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, READ);

    const { result } = yield handleEventSubscription(PROVIDER);

    yield put(ProviderCreators.getAllProvidersSuccess(result));
  } catch (err) {
    yield put(ProviderCreators.getAllProvidersFailure(err));
  }
}

export function* editProvider(action) {
  try {
    const { provider } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, UPDATE, provider);

    const { result } = yield handleEventSubscription(PROVIDER);

    yield put(ProviderCreators.editProviderSuccess(result));
  } catch (err) {
    yield put(ProviderCreators.editProviderFailure(err));
  }
}

export function* removeProvider(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, DELETE, id);

    yield handleEventSubscription(PROVIDER);

    yield put(ProviderCreators.removeProviderSuccess(id));
  } catch (err) {
    yield put(ProviderCreators.removeProviderFailure());
  }
}

export const unsubscribe = () => handleEventUnsubscription(PROVIDER);
