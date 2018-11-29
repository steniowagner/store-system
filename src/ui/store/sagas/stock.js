import { select, put } from 'redux-saga/effects';

import { Creators as StockCreators } from '../ducks/stock';

import {
  TAKE_AWAY_PRODUCTS_STOCK,
  UPDATE_PRODUCTS_STOCK,
  RETURN_PRODUTS_STOCK,
  UPDATE_PRODUCT_STOCK,
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

    yield put(StockCreators.editStockSuccess(productInStockEdited));
  } catch (err) {
    yield put(StockCreators.editStockFailure(err));
  }
}

const findItemInStock = (stock, productId) => {
  const index = stock.findIndex(stockItem => stockItem.ProductId === productId);

  return stock[index];
};

const calculateDiffBetweenProductsQuantities = (datasetUpdatedProducts, pastDatasetProducts, stock) => {
  const stockUpdated = datasetUpdatedProducts.map((datasetUpdatedProduct, index) => {
    const datasetUpdatedProductQuantity = parseInt(datasetUpdatedProduct.quantity, 10);
    const pastDatasetProductQuantity = parseInt(pastDatasetProducts[index].quantity, 10);

    const isSameQuantity = (datasetUpdatedProductQuantity === pastDatasetProductQuantity);
    const stockProductInfo = findItemInStock(stock, datasetUpdatedProduct.id);

    if (isSameQuantity) {
      return stockProductInfo;
    }

    const isIncreasingQuantity = (datasetUpdatedProductQuantity > pastDatasetProductQuantity);
    const isDecreasingQuantity = (datasetUpdatedProductQuantity < pastDatasetProductQuantity);

    let newQuantity;

    if (isIncreasingQuantity) {
      newQuantity = stockProductInfo.stockQuantity - (datasetUpdatedProductQuantity - pastDatasetProductQuantity);
    }

    if (isDecreasingQuantity) {
      newQuantity = stockProductInfo.stockQuantity + (pastDatasetProductQuantity - datasetUpdatedProductQuantity);
    }

    return {
      ...stockProductInfo,
      stockQuantity: newQuantity,
    };
  });

  return stockUpdated;
};

const getDifferenceBetweenDatasets = (firstDataset, secondDataset) => {
  const productsRemovedOrCreated = [];
  const productsRemained = [];

  firstDataset.products.forEach((firstDatasetProduct) => {
    const indexProductInSecondDataset = secondDataset.products.findIndex(secondDatasetItem => (secondDatasetItem.id === firstDatasetProduct.id));
    const productStillInDataset = (indexProductInSecondDataset >= 0);

    if (productStillInDataset) {
      productsRemained.push(firstDatasetProduct);
    } else {
      productsRemovedOrCreated.push(firstDatasetProduct);
    }
  });

  return {
    productsRemained,
    productsRemovedOrCreated,
  };
};

const returnProductsToStock = (products, stock) => {
  const stockUpdated = products.map((product) => {
    const productStockInfo = findItemInStock(stock, product.id);

    return {
      ...productStockInfo,
      stockQuantity: productStockInfo.stockQuantity + product.quantity,
    };
  });

  return stockUpdated;
};

const takeAwayProductsFromStock = (products, stock) => {
  const stockUpdated = products.map((product) => {
    const productStockInfo = findItemInStock(stock, product.id);

    return {
      ...productStockInfo,
      stockQuantity: productStockInfo.stockQuantity - product.quantity,
    };
  });

  return stockUpdated;
};

const handleStockEdit = (datasetUpdated, pastDataset, stock) => {
  const firstOperation = getDifferenceBetweenDatasets(pastDataset, datasetUpdated);
  const secondOperation = getDifferenceBetweenDatasets(datasetUpdated, pastDataset);

  const diffBetweenRemainedProductsQuantities = calculateDiffBetweenProductsQuantities(secondOperation.productsRemained, firstOperation.productsRemained, stock);
  const stockUpdtedAfterReturnProductsToStock = returnProductsToStock(firstOperation.productsRemovedOrCreated, stock);
  const stockUpdtedAfterInsertProducts = takeAwayProductsFromStock(secondOperation.productsRemovedOrCreated, stock);

  return [...diffBetweenRemainedProductsQuantities, ...stockUpdtedAfterReturnProductsToStock, ...stockUpdtedAfterInsertProducts];
};

export function* editStockProducts(data, dataset, operationType) {
  try {
    const { stock } = yield select(state => ({ stock: state.stock.data }));

    let stockUpdatedAfterOperation;

    if (operationType === UPDATE_PRODUCTS_STOCK) {
      const { index } = data;
      stockUpdatedAfterOperation = handleStockEdit(data, dataset[index], stock);
    }

    if (operationType === TAKE_AWAY_PRODUCTS_STOCK) {
      stockUpdatedAfterOperation = takeAwayProductsFromStock(data.products, stock);
    }

    if (operationType === RETURN_PRODUTS_STOCK) {
      const stockWithoutDatasetProducts = stock.filter(stockItem => data.products.findIndex(product => product.id === stockItem['Product.id']));
      stockUpdatedAfterOperation = [...stockWithoutDatasetProducts, ...returnProductsToStock(data.products, stock)];
    }

    ipcRenderer.send(OPERATION_REQUEST, STOCK, UPDATE_PRODUCTS_STOCK, stockUpdatedAfterOperation);

    const stockUpdated = stock.map((stockItem) => {
      const stockItemUpdatedIndex = stockUpdatedAfterOperation.findIndex(stockItemUpdated => stockItemUpdated.id === stockItem.id);

      const item = (stockItemUpdatedIndex >= 0 ? stockUpdatedAfterOperation[stockItemUpdatedIndex] : stockItem);

      return {
        ...stockItem,
        stockQuantity: item.stockQuantity,
      };
    });

    yield put(StockCreators.editStockInBatchSuccess(stockUpdated));
  } catch (err) {
    yield put(StockCreators.editStockInBatchFailure(err));
  }
}

export const unsubscribeStockEvents = () => handleEventUnsubscription(STOCK);
