import { select, call, put } from 'redux-saga/effects';

import { Creators as StockCreators } from '../ducks/stock';

import {
  TAKE_AWAY_PRODUCTS_STOCK,
  UPDATE_PRODUCTS_STOCK,
  RETURN_PRODUTS_STOCK,
  UPDATE_PRODUCT_STOCK,
  READ_STOCK,
  INSERT,
} from './event-handlers-types/stock';

import { getNumberStockUnderMin } from './alerts';
import { STOCK } from './entitiesTypes';
import execRequest from './execRequest';

const EVENT_TAGS = {
  EDIT_SINGLE_PRODUCT_STOCK: 'STOCK_EDIT_SINGLE_PRODUCT',
  INSERT_PRODUCT_STOCK: 'STOCK_INSERT_PRODUCT',
  EDIT_PRODUCTS_STOCK: 'STOCK_EDIT_PRODUCTS',
  REMOVE_STOCK: 'STOCK_REMOVE',
  STOCK_GET: 'GET_STOCK',
};

export function* getStock() {
  try {
    const result = yield call(execRequest, STOCK, READ_STOCK, EVENT_TAGS.STOCK_GET);

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
    const result = yield call(execRequest, STOCK, INSERT, EVENT_TAGS.INSERT_PRODUCT_STOCK, args);

    const productInfo = {
      ...args,
      id: result,
    };

    yield put(StockCreators.insertProductSuccess(productInfo));
    yield call(getNumberStockUnderMin);
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

    yield call(execRequest, STOCK, UPDATE_PRODUCT_STOCK, EVENT_TAGS.EDIT_SINGLE_PRODUCT_STOCK, productEdited);

    yield put(StockCreators.editStockSuccess(productInfo));
    yield call(getNumberStockUnderMin);
  } catch (err) {
    yield put(StockCreators.editStockFailure(err));
  }
}

const findItemInStock = (stock, productId) => {
  const index = stock.findIndex(stockItem => stockItem.ProductId === productId);

  return stock[index];
};

const calculateDiffQuantities = (datasetUpdatedProducts, pastDatasetProducts, stock) => {
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

  const diffRemainedProducts = calculateDiffQuantities(secondOperation.productsRemained, firstOperation.productsRemained, stock);
  const stockUpdtedAfterReturnProductsToStock = returnProductsToStock(firstOperation.productsRemovedOrCreated, stock);
  const stockUpdtedAfterInsertProducts = takeAwayProductsFromStock(secondOperation.productsRemovedOrCreated, stock);

  return [...diffRemainedProducts, ...stockUpdtedAfterReturnProductsToStock, ...stockUpdtedAfterInsertProducts];
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

    yield call(execRequest, STOCK, UPDATE_PRODUCTS_STOCK, EVENT_TAGS.EDIT_PRODUCTS_STOCK, stockUpdatedAfterOperation);

    const stockUpdated = stock.map((stockItem) => {
      const stockItemUpdatedIndex = stockUpdatedAfterOperation.findIndex(stockItemUpdated => stockItemUpdated.id === stockItem.id);

      const item = (stockItemUpdatedIndex >= 0 ? stockUpdatedAfterOperation[stockItemUpdatedIndex] : stockItem);

      return {
        ...stockItem,
        stockQuantity: item.stockQuantity,
      };
    });

    yield put(StockCreators.editStockInBatchSuccess(stockUpdated));
    yield call(getNumberStockUnderMin);
  } catch (err) {
    yield put(StockCreators.editStockInBatchFailure(err));
  }
}
