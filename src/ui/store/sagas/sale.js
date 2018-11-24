import { select, call, put } from 'redux-saga/effects';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Creators as SaleCreators } from '../ducks/sale';

import {
  CREATE_SALE,
  UPDATE_SALE,
  READ_SALES,
} from '../../../back-end/events-handlers/sale/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, SALE } from '../../../common/entitiesTypes';
import { editStockProductsInBatch } from './stock';

const { ipcRenderer } = window.require('electron');

const parseSaleToTableView = (sale: Object): Object => ({
  subtotalText: `R$ ${sale.subtotal.toFixed(2)}`,
  customerName: sale.customer.name || '-',
  totalText: `R$ ${sale.total.toFixed(2)}`,
  products: JSON.parse(sale.products),
});

export function* createSale(action) {
  try {
    const { args } = action;

    const params = {
      ...args,
      products: JSON.stringify(args.products),
      subtotal: parseFloat(args.subtotal),
      dateToShow: moment().format('lll'),
      total: parseFloat(args.total),
      salesman: 'steniowagner',
    };

    ipcRenderer.send(OPERATION_REQUEST, SALE, CREATE_SALE, params);

    const { result } = yield handleEventSubscription(SALE);

    const newSale = {
      ...params,
      ...parseSaleToTableView(params),
      id: result,
    };

    yield put(SaleCreators.createSaleSuccess(newSale));
    yield call(editStockProductsInBatch, args, CREATE_SALE);
  } catch (err) {
    yield put(SaleCreators.createSaleFailure(err.message));
  }
}

export function* getAllSales() {
  try {
    moment.locale('pt-br');

    ipcRenderer.send(OPERATION_REQUEST, SALE, READ_SALES);

    const { result } = yield handleEventSubscription(SALE);

    const allSales = result.map(sale => ({
      ...sale,
      ...parseSaleToTableView(sale),
    }));

    yield put(SaleCreators.getAllSalesSuccess(allSales));
  } catch (err) {
    yield put(SaleCreators.getAllSalesFailure(err.message));
  }
}

export function* editSale(action) {
  try {
    const { sale } = action.payload;

    yield call(editStockProductsInBatch, sale, UPDATE_SALE);

    const params = {
      ...sale,
      products: JSON.stringify(sale.products),
      subtotal: parseFloat(sale.subtotal),
      total: parseFloat(sale.total),
      salesman: 'steniowagner',
    };

    ipcRenderer.send(OPERATION_REQUEST, SALE, UPDATE_SALE, params);

    const allSales = yield select(state => state.sale.data);

    const { subtotal, total } = sale;

    const salesUpdated = Object.assign([],
      allSales, {
        [sale.index]: {
          ...sale,
          subtotalText: `R$ ${parseFloat(subtotal).toFixed(2)}`,
          totalText: `R$ ${parseFloat(total).toFixed(2)}`,
          customerName: sale.customer.name || '-',
        },
      });

    yield put(SaleCreators.editSaleSuccess(salesUpdated));
  } catch (err) {
    yield put(SaleCreators.editSaleFailure(err.message));
  }
}

export const unsubscribeSaleEvents = () => handleEventUnsubscription(SALE);
