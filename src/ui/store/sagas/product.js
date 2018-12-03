import { call, put } from 'redux-saga/effects';

import { Creators as ProductCreators } from '../ducks/product';

import {
  CREATE_PRODUCT,
  READ_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../../../back-end/events-handlers/product/types';

import { CREATE_BRAND } from '../../../back-end/events-handlers/brand/types';
import { INSERT_PRODUCT_STOCK } from '../../../back-end/events-handlers/stock/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import {
  OPERATION_REQUEST,
  PRODUCT,
  BRAND,
  STOCK,
} from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

const EVENT_TAGS = {
  INSERT_PRODUCT_IN_STOCK_PRODUCT: 'PRODUCT_INSERT_PRODUCT_IN_STOCK',
  PRODUCT_CREATE: 'CREATE_PRODUCT',
  PRODUCT_CREATE_BRAND: 'CREATE_BRAND_PRODUCT',
  GET_ALL_PRODUCTS: 'PRODUCTS_GET_ALL',
  EDIT_PRODUCT: 'PRODUCT_EDIT',
  REMOVE_PRODUCT: 'PRODUCT_REMOVE',
};

function* handleCreateBrand({ brandsCreated, brand }) {
  ipcRenderer.send(OPERATION_REQUEST, BRAND, CREATE_BRAND, EVENT_TAGS.PRODUCT_CREATE_BRAND, brandsCreated);

  const { result } = yield handleEventSubscription(EVENT_TAGS.PRODUCT_CREATE_BRAND);

  const brandSelectedIndex = result.findIndex(brandCreated => brandCreated.name === brand.name);

  return result[brandSelectedIndex].id;
}

const handleInsertProductStock = ({ minStockQuantity, stockQuantity }, ProductId) => {
  const productInfo = {
    minStockQuantity,
    stockQuantity,
    ProductId,
  };

  ipcRenderer.send(OPERATION_REQUEST, STOCK, INSERT_PRODUCT_STOCK, EVENT_TAGS.INSERT_PRODUCT_IN_STOCK_PRODUCT, productInfo);
};

export function* createProduct(action) {
  try {
    const { args } = action;

    const hasNewBrands = !!args.brandsCreated.length;
    const BrandId = (hasNewBrands ? yield call(handleCreateBrand, args) : args.brand.id);

    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, CREATE_PRODUCT, EVENT_TAGS.PRODUCT_CREATE, {
      costPrice: parseFloat(args.costPrice),
      salePrice: parseFloat(args.salePrice),
      description: args.description,
      barcode: args.barcode,
      BrandId,
    });

    const { result } = yield handleEventSubscription(EVENT_TAGS.PRODUCT_CREATE);

    yield call(handleInsertProductStock, args, result);

    const newProduct = {
      ...args,
      id: result,
    };

    yield put(ProductCreators.createProductSuccess(newProduct));
  } catch (err) {
    yield put(ProductCreators.createProductFailure(err.message));
  }
}

const parseProduct = (product: Object): Object => ({
  description: product.description,
  costPrice: product.costPrice,
  salePrice: product.salePrice,
  barcode: product.barcode,
  brand: {
    name: product['Brand.name'],
    id: product['Brand.id'],
  },
  id: product.id,
});

export function* getAllProducts() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, READ_PRODUCT, EVENT_TAGS.GET_ALL_PRODUCTS);

    const { result } = yield handleEventSubscription(EVENT_TAGS.GET_ALL_PRODUCTS);

    const allProducts = result.map(product => parseProduct(product));

    yield put(ProductCreators.getAllProductsSuccess(allProducts));
  } catch (err) {
    yield put(ProductCreators.getAllProductsFailure(err.message));
  }
}

export function* editProduct(action) {
  try {
    const { product } = action.payload;

    const hasNewBrands = !!product.brandsCreated.length;
    const BrandId = (hasNewBrands ? yield call(handleCreateBrand, product) : product.brand.id);

    const productEdited = {
      ...product,
      BrandId,
    };

    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, UPDATE_PRODUCT, EVENT_TAGS.EDIT_PRODUCT, productEdited);

    const { result } = yield handleEventSubscription(EVENT_TAGS.EDIT_PRODUCT);

    yield put(ProductCreators.editProductSuccess({
      productEdited: parseProduct(result.productEdited),
      index: result.index,
    }));
  } catch (err) {
    yield put(ProductCreators.editProductFailure(err.message));
  }
}

export function* removeProduct(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, DELETE_PRODUCT, EVENT_TAGS.REMOVE_PRODUCT, id);

    yield handleEventSubscription(EVENT_TAGS.REMOVE_PRODUCT);

    yield put(ProductCreators.removeProductSuccess(id));
  } catch (err) {
    yield put(ProductCreators.removeProductFailure(err.message));
  }
}

export const unsubscribeProductEvents = () => handleEventUnsubscription(EVENT_TAGS);
