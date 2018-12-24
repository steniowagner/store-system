import { call, put } from 'redux-saga/effects';

import { Creators as ProviderCreators } from '../ducks/provider';

import {
  CREATE_PROVIDER,
  READ_PROVIDERS,
  UPDATE_PROVIDER,
  DELETE_PROVIDER,
} from './event-handlers-types/provider';

import { PROVIDER } from './entitiesTypes';
import execRequest from './execRequest';

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

    const result = yield call(execRequest, PROVIDER, CREATE_PROVIDER, EVENT_TAGS.PROVIDER_CREATE, args);

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
    const result = yield call(execRequest, PROVIDER, READ_PROVIDERS, EVENT_TAGS.PROVIDERS_GET_ALL);

    yield put(ProviderCreators.getAllProvidersSuccess(result));
  } catch (err) {
    yield put(ProviderCreators.getAllProvidersFailure(err));
  }
}

export function* editProvider(action) {
  try {
    const { provider } = action.payload;

    yield call(execRequest, PROVIDER, UPDATE_PROVIDER, EVENT_TAGS.EDIT_PROVIDER, provider);
    yield put(ProviderCreators.editProviderSuccess(provider));
  } catch (err) {
    yield put(ProviderCreators.editProviderFailure(err));
  }
}

export function* removeProvider(action) {
  try {
    const { id } = action.payload;

    yield call(execRequest, PROVIDER, DELETE_PROVIDER, EVENT_TAGS.REMOVE_PROVIDER, id);
    yield put(ProviderCreators.removeProviderSuccess(id));
  } catch (err) {
    yield put(ProviderCreators.removeProviderFailure());
  }
}
