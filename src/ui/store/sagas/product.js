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

function* handleCreateBrand({ brandsCreated, brand }) {
  const brands = brandsCreated.map(brandCreated => ({ name: brandCreated }));

  ipcRenderer.send(OPERATION_REQUEST, BRAND, CREATE_BRAND, brands);

  const { result } = yield handleEventSubscription(BRAND);

  const brandSelectedIndex = result.findIndex(brandCreated => brandCreated.name === brand.name);

  return result[brandSelectedIndex].id;
}

const handleInsertProductStock = ({ minStockQuantity, stockQuantity }, ProductId) => {
  const productInfo = {
    minStockQuantity,
    stockQuantity,
    ProductId,
  };

  ipcRenderer.send(OPERATION_REQUEST, STOCK, INSERT_PRODUCT_STOCK, productInfo);
};

export function* createProduct(action) {
  try {
    const { args } = action;

    const hasNewBrands = !!args.brandsCreated.length;
    const BrandId = (hasNewBrands ? yield call(handleCreateBrand, args) : args.brand.id);

    /* const id =;

    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, CREATE_PRODUCT, {
      costPrice: parseFloat(args.costPrice),
      salePrice: parseFloat(args.salePrice),
      description: args.description,
      barcode: args.barcode,
      BrandId: id,
    });

    const { result } = yield handleEventSubscription(PRODUCT);

    yield call(handleInsertProductStock, args, result);

    const newProduct = {
      ...args,
      id: result,
    };

    yield put(ProductCreators.createProductSuccess(newProduct)); */
  } catch (err) {
    yield put(ProductCreators.createProductFailure(err.message));
  }
}

export function* getAllProducts() {
  try {
    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, READ_PRODUCT);

    const { result } = yield handleEventSubscription(PRODUCT);

    yield put(ProductCreators.getAllProductsSuccess(result));
  } catch (err) {
    yield put(ProductCreators.getAllProductsFailure(err.message));
  }
}

export function* editProduct(action) {
  try {
    const { product } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, UPDATE_PRODUCT, product);

    const { result } = yield handleEventSubscription(PRODUCT);

    yield put(ProductCreators.editProductSuccess(result));
  } catch (err) {
    yield put(ProductCreators.editProductFailure(err.message));
  }
}

export function* removeProduct(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, PRODUCT, DELETE_PRODUCT, id);

    yield handleEventSubscription(PRODUCT);

    yield put(ProductCreators.removeProductSuccess(id));
  } catch (err) {
    yield put(ProductCreators.removeProductFailure(err.message));
  }
}

export const unsubscribeProductEvents = () => {
  handleEventUnsubscription(PRODUCT);
  handleEventUnsubscription(BRAND);
};
