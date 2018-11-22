import { select, put } from 'redux-saga/effects';

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

const { ipcRenderer } = window.require('electron');

const parseSaleToTableView = (sale: Object): Object => ({
  subtotalText: `R$ ${sale.subtotal.toFixed(2)}`,
  customerName: sale.customer.name || '-',
  totalText: `R$ ${sale.total.toFixed(2)}`,
  products: JSON.parse(sale.products),
  dateToShow: moment().format('lll'),
});

export function* createSale(action) {
  try {
    const { args } = action;

    const params = {
      ...args,
      products: JSON.stringify(args.products),
      subtotal: parseFloat(args.subtotal),
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

    console.log(newSale)

    yield put(SaleCreators.createSaleSuccess(newSale));
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

    const params = {
      ...sale,
      products: JSON.stringify(sale.products),
      subtotal: parseFloat(sale.subtotal),
      total: parseFloat(sale.total),
      salesman: 'steniowagner',
    };

    ipcRenderer.send(OPERATION_REQUEST, SALE, UPDATE_SALE, params);

    yield handleEventSubscription(SALE);

    const allSales = yield select(state => state.sale.data);
    const salesUpdated = Object.assign([],
      allSales, {
        [sale.index]: {
          ...sale,
          ...parseSaleToTableView(allSales[sale.index]),
        },
      });

    yield put(SaleCreators.editSaleSuccess(salesUpdated));
  } catch (err) {
    yield put(SaleCreators.editSaleFailure(err.message));
  }
}

export const unsubscribeSaleEvents = () => handleEventUnsubscription(SALE);
