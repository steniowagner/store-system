import { put } from 'redux-saga/effects';

import { Creators as StockCreators } from '../ducks/stock';

import {
  INSERT,
  READ,
  UPDATE,
} from '../../../back-end/events-handlers/stock/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, STOCK } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

export function* get() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, STOCK, READ);

    const { result } = yield handleEventSubscription(STOCK);

    yield put(StockCreators.getStockSuccess(result));
  } catch (err) {
    yield put(StockCreators.getStockFailure(err));
  }
}

export function* insert(action) {
  try {
    const { args } = action;
    ipcRenderer.send(OPERATION_REQUEST, STOCK, INSERT, args);


    const { result } = yield handleEventSubscription(STOCK);

    const productInfo = {
      ...args,
      id: result,
    };

    yield put(StockCreators.insertProductSuccess(productInfo));
  } catch (err) {
    yield put(StockCreators.insertProductFailure(err.message));
  }
}

export function* edit(action) {
  try {
    const { productInfo } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, STOCK, UPDATE, productInfo);

    const { result } = yield handleEventSubscription(STOCK);

    yield put(StockCreators.editProductSuccess(result));
  } catch (err) {
    yield put(StockCreators.editProductFailure(err));
  }
}

export const unsubscribeStockEvents = () => handleEventUnsubscription(STOCK);
