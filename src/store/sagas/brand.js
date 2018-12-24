import { call, put } from 'redux-saga/effects';

import { Creators as BrandCreators } from '../ducks/brand';

import { READ_BRANDS, CREATE_BRANDS } from './event-handlers-types/brand';
import { BRAND } from './entitiesTypes';
import execRequest from './execRequest';

const EVENT_TAGS = {
  CREATE_BRANDS: 'BRANDS_CREATE',
  READ_ALL: 'BRANDS_READ_ALL',
};

export function* getAllBrands() {
  try {
    const result = yield call(execRequest, BRAND, READ_BRANDS, EVENT_TAGS.READ_ALL);

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

    const result = yield call(execRequest, BRAND, CREATE_BRANDS, EVENT_TAGS.CREATE_BRANDS, params);

    return result;
  } catch (err) {
    return err;
  }
}
