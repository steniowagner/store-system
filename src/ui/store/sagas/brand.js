import { put } from 'redux-saga/effects';

import { Creators as BrandCreators } from '../ducks/brand';

import { READ_BRANDS } from '../../../back-end/events-handlers/brand/types';

import { handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, BRAND } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

export function* getAllBrands() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, BRAND, READ_BRANDS);

    const { result } = yield handleEventSubscription(BRAND);

    yield put(BrandCreators.getAllBrandsSuccess(result));
  } catch (err) {
    yield put(BrandCreators.getAllBrandsFailure(err.message));
  }
}
