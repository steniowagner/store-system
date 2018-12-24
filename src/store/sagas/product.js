import { call, put } from 'redux-saga/effects';

import { Creators as ProductCreators } from '../ducks/product';
import { Creators as BrandCreators } from '../ducks/brand';

import {
  CREATE_PRODUCT,
  READ_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from './event-handlers-types/product';

import { INSERT_PRODUCT_STOCK } from './event-handlers-types/stock';
import { PRODUCT, STOCK } from './entitiesTypes';
import execRequest from './execRequest';
import { createBrands } from './brand';

const EVENT_TAGS = {
  INSERT_PRODUCT_IN_STOCK_PRODUCT: 'PRODUCT_INSERT_PRODUCT_IN_STOCK',
  GET_ALL_PRODUCTS: 'PRODUCTS_GET_ALL',
  PRODUCT_CREATE: 'CREATE_PRODUCT',
  REMOVE_PRODUCT: 'PRODUCT_REMOVE',
  EDIT_PRODUCT: 'PRODUCT_EDIT',
};

function* handleCreateBrand({ brandsCreated, brand }) {
  const { id } = yield call(createBrands, brandsCreated, brand.name);

  return id;
}

function* handleInsertProductStock({ minStockQuantity, stockQuantity }, ProductId) {
  const productInfo = {
    minStockQuantity,
    stockQuantity,
    ProductId,
  };

  yield call(execRequest, STOCK, INSERT_PRODUCT_STOCK, EVENT_TAGS.INSERT_PRODUCT_IN_STOCK_PRODUCT, productInfo);
}

export function* createProduct(action) {
  try {
    const { args } = action;

    const hasNewBrands = !!args.brandsCreated.length;
    const BrandId = (hasNewBrands ? yield call(handleCreateBrand, args) : args.brand.id);

    const newProductData = {
      costPrice: parseFloat(args.costPrice),
      salePrice: parseFloat(args.salePrice),
      description: args.description,
      barcode: args.barcode,
      BrandId,
    };

    const result = yield call(execRequest, PRODUCT, CREATE_PRODUCT, EVENT_TAGS.PRODUCT_CREATE, newProductData);

    yield call(handleInsertProductStock, args, result);

    const newProduct = {
      ...args,
      id: result,
    };

    yield put(ProductCreators.createProductSuccess(newProduct));
    yield put(BrandCreators.getAllBrands());
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
    const result = yield call(execRequest, PRODUCT, READ_PRODUCTS, EVENT_TAGS.GET_ALL_PRODUCTS);

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

    yield call(execRequest, PRODUCT, UPDATE_PRODUCT, EVENT_TAGS.EDIT_PRODUCT, productEdited);

    yield put(ProductCreators.editProductSuccess(product));
    yield put(BrandCreators.getAllBrands());
  } catch (err) {
    yield put(ProductCreators.editProductFailure(err.message));
  }
}

export function* removeProduct(action) {
  try {
    const { id } = action.payload;

    yield call(execRequest, PRODUCT, DELETE_PRODUCT, EVENT_TAGS.REMOVE_PRODUCT, id);
    yield put(ProductCreators.removeProductSuccess(id));
  } catch (err) {
    yield put(ProductCreators.removeProductFailure(err.message));
  }
}
