import { put } from 'redux-saga/effects';

import { Creators as BrandCreators } from '../ducks/brand';

import { READ_BRANDS, CREATE_BRANDS } from '../../../back-end/events-handlers/brand/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, BRAND } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

const EVENT_TAGS = {
  CREATE_BRANDS: 'BRANDS_CREATE',
  READ_ALL: 'BRANDS_READ_ALL',
};

export function* getAllBrands() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, BRAND, READ_BRANDS, EVENT_TAGS.READ_ALL);
    const { result } = yield handleEventSubscription(EVENT_TAGS.READ_ALL);
    handleEventUnsubscription(EVENT_TAGS.READ_ALL);

    yield put(BrandCreators.getAllBrandsSuccess(result));
  } catch (err) {
    yield put(BrandCreators.getAllBrandsFailure(err.message));
  }
}

export function* createBrands(brandsCreated, brandSelected) {
  try {
    const params = {
      brandSelected,
      brandsCreated,
    };

    ipcRenderer.send(OPERATION_REQUEST, BRAND, CREATE_BRANDS, EVENT_TAGS.CREATE_BRANDS, params);
    const { result } = yield handleEventSubscription(EVENT_TAGS.CREATE_BRANDS);
    handleEventUnsubscription(EVENT_TAGS.CREATE_BRANDS);

    return result;
  } catch (err) {
    return err;
  }
}
