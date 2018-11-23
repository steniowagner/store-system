import { select, put } from 'redux-saga/effects';

import { Creators as StockCreators } from '../ducks/stock';

import {
  UPDATE_PRODUCT_STOCK,
  UPDATE_IN_BATCH,
  READ_STOCK,
  INSERT,
} from '../../../back-end/events-handlers/stock/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, STOCK } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

export function* getStock() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, STOCK, READ_STOCK);

    const { result } = yield handleEventSubscription(STOCK);

    const stockProducts = result.map(product => ({
      ...product,
      description: product['Product.description'],
    }));

    yield put(StockCreators.getStockSuccess(stockProducts));
  } catch (err) {
    yield put(StockCreators.getStockFailure(err));
  }
}

export function* insertProduct(action) {
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

export function* editStockProductsInBatch(products) {
  const stock = yield select(state => state.stock.data);

  const productsStockInfo = products.map((product) => {
    const productInStockIndex = stock.findIndex(stockItem => stockItem['Product.id'] === product.id);

    return ({
      stockQuantity: stock[productInStockIndex].stockQuantity - product.quantity,
      minStockQuantity: stock[productInStockIndex].minStockQuantity,
      ProductId: stock[productInStockIndex].ProductId,
      id: stock[productInStockIndex].id,
    });
  });

  console.log(productsStockInfo);
  // ipcRenderer.send(OPERATION_REQUEST, STOCK, UPDATE_IN_BATCH, productsStockInfo);
}

export function* editProductInStock(action) {
  try {
    const { productInfo } = action.payload;

    const productEdited = {
      minStockQuantity: parseInt(productInfo.minStockQuantity, 10),
      stockQuantity: parseInt(productInfo.stockQuantity, 10),
      id: productInfo.id,
    };

    ipcRenderer.send(OPERATION_REQUEST, STOCK, UPDATE_PRODUCT_STOCK, productEdited);

    const { result } = yield handleEventSubscription(STOCK);
    const { stockItemEdited, index } = result;

    const productInStockEdited = {
      stockItemEdited: {
        ...stockItemEdited,
        description: stockItemEdited['Product.description'],
      },
      index,
    };

    yield put(StockCreators.editProductSuccess(productInStockEdited));
  } catch (err) {
    yield put(StockCreators.editProductFailure(err));
  }
}

export const unsubscribeStockEvents = () => handleEventUnsubscription(STOCK);
