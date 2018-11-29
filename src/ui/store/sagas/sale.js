import { select, call, put } from 'redux-saga/effects';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Creators as SaleCreators } from '../ducks/sale';

import { UPDATE_PRODUCTS_STOCK, TAKE_AWAY_PRODUCTS_STOCK } from '../../../back-end/events-handlers/stock/types';

import {
  CREATE_SALE,
  UPDATE_SALE,
  READ_SALES,
} from '../../../back-end/events-handlers/sale/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, SALE } from '../../../common/entitiesTypes';
import { editStockProducts } from './stock';

const { ipcRenderer } = window.require('electron');

const parseSaleToTableView = (sale: Object): Object => ({
  ...sale,
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
      ...parseSaleToTableView(params),
      id: result,
    };

    yield put(SaleCreators.createSaleSuccess(newSale));

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

    ipcRenderer.send(OPERATION_REQUEST, SALE, READ_SALES);

    const { result } = yield handleEventSubscription(SALE);

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

    ipcRenderer.send(OPERATION_REQUEST, SALE, UPDATE_SALE, params);

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
