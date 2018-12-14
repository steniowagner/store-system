import { put } from 'redux-saga/effects';

import { Creators as ProviderCreators } from '../ducks/provider';

import {
  CREATE_PROVIDER,
  READ_PROVIDERS,
  UPDATE_PROVIDER,
  DELETE_PROVIDER,
} from '../../../back-end/events-handlers/provider/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, PROVIDER } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

const EVENT_TAGS = {
  GET_ALL_PRODUCTS: 'PROVIDER_PRODUCTS_GET_ALL',
  PROVIDERS_GET_ALL: 'GET_ALL_PROVIDERS',
  REMOVE_PROVIDER: 'PROVIDER_REMOVE',
  PROVIDER_CREATE: 'CREATE_PROVIDER',
  EDIT_PROVIDER: 'PROVIDER_EDIT',
};

export function* createProvider(action) {
  try {
    const { args } = action;

    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, CREATE_PROVIDER, EVENT_TAGS.PROVIDER_CREATE, args);
    const { result } = yield handleEventSubscription(EVENT_TAGS.PROVIDER_CREATE);
    handleEventUnsubscription(EVENT_TAGS.PROVIDER_CREATE);

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
    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, READ_PROVIDERS, EVENT_TAGS.PROVIDERS_GET_ALL);
    const { result } = yield handleEventSubscription(EVENT_TAGS.PROVIDERS_GET_ALL);
    handleEventUnsubscription(EVENT_TAGS.EDIT_PROVIDER);

    yield put(ProviderCreators.getAllProvidersSuccess(result));
  } catch (err) {
    yield put(ProviderCreators.getAllProvidersFailure(err));
  }
}

export function* editProvider(action) {
  try {
    const { provider } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, UPDATE_PROVIDER, EVENT_TAGS.EDIT_PROVIDER, provider);
    yield handleEventSubscription(EVENT_TAGS.EDIT_PROVIDER);
    handleEventUnsubscription(EVENT_TAGS.EDIT_PROVIDER);

    yield put(ProviderCreators.editProviderSuccess(provider));
  } catch (err) {
    yield put(ProviderCreators.editProviderFailure(err));
  }
}

export function* removeProvider(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, PROVIDER, DELETE_PROVIDER, EVENT_TAGS.REMOVE_PROVIDER, id);
    yield handleEventSubscription(EVENT_TAGS.REMOVE_PROVIDER);
    handleEventUnsubscription(EVENT_TAGS.REMOVE_PROVIDER);

    yield put(ProviderCreators.removeProviderSuccess(id));
  } catch (err) {
    yield put(ProviderCreators.removeProviderFailure());
  }
}
