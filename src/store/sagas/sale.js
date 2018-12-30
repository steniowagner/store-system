import { select, call, put } from 'redux-saga/effects';

import moment from 'moment';
import 'moment/locale/pt-br';

import shorthash from 'shorthash';

import { Creators as SaleCreators } from '../ducks/sale';

import { UPDATE_PRODUCTS_STOCK, TAKE_AWAY_PRODUCTS_STOCK } from './event-handlers-types/stock';
import { CREATE_SALE, UPDATE_SALE, READ_SALES } from './event-handlers-types/sale';
import { getNumberCustomersInDebit, getNumberStockUnderMin } from './alerts';
import { onAddSaleOperation, onEditSaleOperation } from './cashier';
import { editStockProducts } from './stock';
import execRequest from './execRequest';
import { SALE } from './entitiesTypes';

const parseSaleToTableView = (sale: Object): Object => ({
  ...sale,
  subtotalText: `$ ${sale.subtotal.toFixed(2)}`,
  customerName: sale.customer.name || '-',
  totalText: `$ ${sale.total.toFixed(2)}`,
  products: sale.products.data,
});

const EVENT_TAGS = {
  SALES_GET_ALL: 'GET_ALL_SALES',
  SALE_CREATE: 'CREATE_SALE',
  REMOVE_SALE: 'SALE_REMOVE',
  EDIT_SALE: 'SALE_EDIT',
};

export function* createSale(action) {
  try {
    const { args } = action;
    const { username } = yield select(state => state.auth.user);

    const params = {
      ...args,
      code: shorthash.unique(moment().format()),
      products: { data: args.products },
      subtotal: parseFloat(args.subtotal),
      dateToShow: moment().format('lll'),
      total: parseFloat(args.total),
      salesman: username,
    };

    const result = yield call(execRequest, SALE, CREATE_SALE, EVENT_TAGS.SALE_CREATE, params);

    const newSale = {
      ...parseSaleToTableView(params),
      id: result,
    };

    yield put(SaleCreators.createSaleSuccess(newSale));
    yield call(onAddSaleOperation, newSale);
    yield call(getNumberCustomersInDebit);
    yield call(getNumberStockUnderMin);

    const { createdFromBudget } = args;

    if (!createdFromBudget) {
      const allSales = yield select(state => state.sale.data);

      yield call(editStockProducts, args, allSales, TAKE_AWAY_PRODUCTS_STOCK);
    }
  } catch (err) {
    yield put(SaleCreators.createSaleFailure());
  }
}

export function* getAllSales() {
  try {
    moment.locale('pt-br');

    const result = yield execRequest(SALE, READ_SALES, EVENT_TAGS.SALES_GET_ALL);

    const allSales = result.map(sale => ({
      ...parseSaleToTableView(sale),
    }));

    yield put(SaleCreators.getAllSalesSuccess(allSales));
  } catch (err) {
    yield put(SaleCreators.getAllSalesFailure(err.message));
  }
}

export function* editSale(action) {
  try {
    const allSales = yield select(state => state.sale.data);

    const { sale } = action.payload;

    yield call(editStockProducts, sale, allSales, UPDATE_PRODUCTS_STOCK);

    const params = {
      ...sale,
      subtotal: parseFloat(sale.subtotal),
      products: { data: sale.products },
      total: parseFloat(sale.total),
    };

    yield call(execRequest, SALE, UPDATE_SALE, EVENT_TAGS.EDIT_SALE, params);

    const { subtotal, total } = sale;

    const saleUpdated = {
      ...sale,
      subtotalText: `$ ${parseFloat(subtotal).toFixed(2)}`,
      totalText: `$ ${parseFloat(total).toFixed(2)}`,
      customerName: sale.customer.name || '-',
    };

    yield put(SaleCreators.editSaleSuccess(saleUpdated));
    yield call(onEditSaleOperation, saleUpdated);
    yield call(getNumberCustomersInDebit);
  } catch (err) {
    yield put(SaleCreators.editSaleFailure());
  }
}
