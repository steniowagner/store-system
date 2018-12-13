import { select, call, put } from 'redux-saga/effects';

import shorthash from 'shorthash';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Creators as SaleCreators } from '../ducks/sale';

import { UPDATE_PRODUCTS_STOCK, TAKE_AWAY_PRODUCTS_STOCK } from '../../../back-end/events-handlers/stock/types';
import { CREATE_SALE, UPDATE_SALE, READ_SALES } from '../../../back-end/events-handlers/sale/types';
import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, SALE } from '../../../common/entitiesTypes';
import { onAddSaleOperation, onEditSaleOperation } from './cashier';
import { getNumberCustomersInDebit, getNumberStockUnderMin } from './alerts';
import { editStockProducts } from './stock';

const { ipcRenderer } = window.require('electron');

const parseSaleToTableView = (sale: Object): Object => ({
  ...sale,
  subtotalText: `R$ ${sale.subtotal.toFixed(2)}`,
  customerName: sale.customer.name || '-',
  totalText: `R$ ${sale.total.toFixed(2)}`,
  products: JSON.parse(sale.products),
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

    const params = {
      ...args,
      code: shorthash.unique(moment().format()),
      products: JSON.stringify(args.products),
      subtotal: parseFloat(args.subtotal),
      dateToShow: moment().format('lll'),
      total: parseFloat(args.total),
      salesman: 'steniowagner',
    };

    ipcRenderer.send(OPERATION_REQUEST, SALE, CREATE_SALE, EVENT_TAGS.SALE_CREATE, params);
    const { result } = yield handleEventSubscription(EVENT_TAGS.SALE_CREATE);
    handleEventUnsubscription(EVENT_TAGS.SALE_CREATE);

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
    yield put(SaleCreators.createSaleFailure(err.message));
  }
}

export function* getAllSales() {
  try {
    moment.locale('pt-br');

    ipcRenderer.send(OPERATION_REQUEST, SALE, READ_SALES, EVENT_TAGS.SALES_GET_ALL);
    const { result } = yield handleEventSubscription(EVENT_TAGS.SALES_GET_ALL);
    handleEventUnsubscription(EVENT_TAGS.SALES_GET_ALL);

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
      products: JSON.stringify(sale.products),
      subtotal: parseFloat(sale.subtotal),
      total: parseFloat(sale.total),
      salesman: 'steniowagner',
    };

    ipcRenderer.send(OPERATION_REQUEST, SALE, UPDATE_SALE, EVENT_TAGS.EDIT_SALE, params);
    yield handleEventSubscription(EVENT_TAGS.EDIT_SALE);
    handleEventUnsubscription(EVENT_TAGS.EDIT_SALE);

    const { subtotal, total } = sale;

    const saleUpdated = {
      ...sale,
      subtotalText: `R$ ${parseFloat(subtotal).toFixed(2)}`,
      totalText: `R$ ${parseFloat(total).toFixed(2)}`,
      customerName: sale.customer.name || '-',
    };

    yield put(SaleCreators.editSaleSuccess(saleUpdated));
    yield call(onEditSaleOperation, saleUpdated);
    yield call(getNumberCustomersInDebit);
  } catch (err) {
    yield put(SaleCreators.editSaleFailure(err.message));
  }
}
