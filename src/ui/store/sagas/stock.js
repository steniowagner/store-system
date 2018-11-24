import { select, put } from 'redux-saga/effects';

import { Creators as StockCreators } from '../ducks/stock';

import { UPDATE_PRODUCT_STOCK, READ_STOCK, INSERT } from '../../../back-end/events-handlers/stock/types';
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

const findItemInStock = (stock, productId) => {
  const index = stock.findIndex(stockItem => stockItem.ProductId === productId);

  return stock[index];
};

const handleEditWithSameProducts = (saleUpdated, pastSale, stock) => {
  const stockUpdated = saleUpdated.products.map((saleUpdatedProduct, index) => {
    const saleUpdatedProductQuantity = parseInt(saleUpdatedProduct.quantity, 10);
    const pastSaleProductQuantity = parseInt(pastSale.products[index].quantity, 10);

    const isSameQuantity = (saleUpdatedProductQuantity === pastSaleProductQuantity);
    const stockProductInfo = findItemInStock(stock, saleUpdatedProduct.id);

    if (isSameQuantity) {
      console.log(saleUpdatedProductQuantity, pastSaleProductQuantity)
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
  const productsRemained = [];
  const productsRemovedOrCreated = [];

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

const handleEditWithMoreProducts = (saleUpdated, pastSale, stock) => {
  const { productsRemained, productsRemovedOrCreated } = getDifferenceBetweenDatasets(saleUpdated, pastSale);

  const newProductsStockInfo = productsRemovedOrCreated.map((product) => {
    const newProductInfoInStock = findItemInStock(stock, product.id);

    return {
      ...newProductInfoInStock,
      stockQuantity: newProductInfoInStock.stockQuantity - product.quantity,
    };
  });



  const p = pastSale.map((x) => {
    // const index = saleUpdated.products.findIndex(s => s.id === x.id);
    console.log(saleUpdated);
    // return (index >= 0 && saleUpdated.products[index]);
  });

  console.log(p)
};

const handleEditWithLessProducts = (saleUpdated, pastSale, stock) => {
  const { productsRemained, productsRemovedOrCreated } = getDifferenceBetweenDatasets(pastSale, saleUpdated);

  const productsRemovedStockInfo = productsRemovedOrCreated.map((productRemoved) => {
    const productRemovedStockInfo = findItemInStock(stock, productRemoved.id);
    const newQuantity = productRemoved.quantity + productRemovedStockInfo.stockQuantity;

    return {
      ...productRemovedStockInfo,
      stockQuantity: newQuantity,
    };
  });

  const saleUpdatedProducts = {
    products: saleUpdated.products,
  };

  const remainedProducts = {
    products: productsRemained,
  };

  const remainedProductsWithStockUpdated = handleEditWithSameProducts(saleUpdatedProducts, remainedProducts, stock);

  return [...productsRemovedStockInfo, ...remainedProductsWithStockUpdated];
};

const handleStockEditAfterUpdateSale = (saleUpdated, pastSale, stock) => {
  const hasIncludedProducts = (saleUpdated.products.length > pastSale.products.length);
  const hasRemovedProducts = (saleUpdated.products.length < pastSale.products.length);
  const hasSameProducts = (saleUpdated.products.length === pastSale.products.length);

  if (hasIncludedProducts) {
    console.log(handleEditWithMoreProducts(saleUpdated, pastSale, stock));
  }

  if (hasRemovedProducts) {
    // console.log(handleEditWithLessProducts(saleUpdated, pastSale, stock));
  }

  if (hasSameProducts) {
    // console.log(handleEditWithSameProducts(saleUpdated, pastSale, stock));
  }
};

export function* editStockProductsInBatch(saleUpdated, saleOperationType) {
  const { stock, sales } = yield select(state => ({
    stock: state.stock.data,
    sales: state.sale.data,
  }));

  if (saleOperationType === UPDATE_SALE) {
    const { index } = saleUpdated;
    handleStockEditAfterUpdateSale(saleUpdated, sales[index], stock);
  }

  /* products.forEach((product) => {
    const productInStockIndex = stock.findIndex(stockItem => stockItem['Product.id'] === product.id);

    const stockItemUpdated = {
      stockQuantity: stock[productInStockIndex].stockQuantity - product.quantity,
      minStockQuantity: stock[productInStockIndex].minStockQuantity,
      ProductId: stock[productInStockIndex].ProductId,
      id: stock[productInStockIndex].id,
    };

    ipcRenderer.send(OPERATION_REQUEST, STOCK, UPDATE_PRODUCT_STOCK, stockItemUpdated);
  }); */
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
