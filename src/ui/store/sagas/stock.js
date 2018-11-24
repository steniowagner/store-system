import { select, put } from 'redux-saga/effects';

import { Creators as StockCreators } from '../ducks/stock';

import {
  UPDATE_PRODUCTS_IN_BATCH,
  UPDATE_PRODUCT_STOCK,
  READ_STOCK,
  INSERT,
} from '../../../back-end/events-handlers/stock/types';

import { CREATE_SALE, UPDATE_SALE } from '../../../back-end/events-handlers/sale/types';

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

const calculateDiffBetweenProductsQuantities = (saleUpdatedProducts, pastSaleProducts, stock) => {
  const stockUpdated = saleUpdatedProducts.map((saleUpdatedProduct, index) => {
    const saleUpdatedProductQuantity = parseInt(saleUpdatedProduct.quantity, 10);
    const pastSaleProductQuantity = parseInt(pastSaleProducts[index].quantity, 10);

    const isSameQuantity = (saleUpdatedProductQuantity === pastSaleProductQuantity);
    const stockProductInfo = findItemInStock(stock, saleUpdatedProduct.id);

    if (isSameQuantity) {
      return stockProductInfo;
    }

    const isIncreasingQuantity = (saleUpdatedProductQuantity > pastSaleProductQuantity);
    const isDecreasingQuantity = (saleUpdatedProductQuantity < pastSaleProductQuantity);

    let newQuantity;

    if (isIncreasingQuantity) {
      newQuantity = stockProductInfo.stockQuantity - (saleUpdatedProductQuantity - pastSaleProductQuantity);
    }

    if (isDecreasingQuantity) {
      newQuantity = stockProductInfo.stockQuantity + (pastSaleProductQuantity - saleUpdatedProductQuantity);
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
    const productStillInSale = (indexProductInSecondDataset >= 0);

    if (productStillInSale) {
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

const inserProductsOnStock = (products, stock) => {
  const stockUpdated = products.map((product) => {
    const productStockInfo = findItemInStock(stock, product.id);

    return {
      ...productStockInfo,
      stockQuantity: productStockInfo.stockQuantity - product.quantity,
    };
  });

  return stockUpdated;
};

const handleStockEditAfterUpdateSale = (saleUpdated, pastSale, stock) => {
  const firstOperation = getDifferenceBetweenDatasets(pastSale, saleUpdated);
  const secondOperation = getDifferenceBetweenDatasets(saleUpdated, pastSale);

  const diffBetweenRemainedProductsQuantities = calculateDiffBetweenProductsQuantities(secondOperation.productsRemained, firstOperation.productsRemained, stock);
  const stockUpdtedAfterReturnProductsToStock = returnProductsToStock(firstOperation.productsRemovedOrCreated, stock);
  const stockUpdtedAfterInsertProducts = inserProductsOnStock(secondOperation.productsRemovedOrCreated, stock);

  return [...diffBetweenRemainedProductsQuantities, ...stockUpdtedAfterReturnProductsToStock, ...stockUpdtedAfterInsertProducts];
};

export function* editStockProductsInBatch(saleUpdated, saleOperationType) {
  const { stock, sales } = yield select(state => ({
    stock: state.stock.data,
    sales: state.sale.data,
  }));

  try {
    let stockUpdatedAfterOperation;

    if (saleOperationType === UPDATE_SALE) {
      const { index } = saleUpdated;
      stockUpdatedAfterOperation = handleStockEditAfterUpdateSale(saleUpdated, sales[index], stock);
    }

    if (saleOperationType === CREATE_SALE) {
      stockUpdatedAfterOperation = inserProductsOnStock(saleUpdated.products, stock);
    }

    ipcRenderer.send(OPERATION_REQUEST, STOCK, UPDATE_PRODUCTS_IN_BATCH, stockUpdatedAfterOperation);

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
