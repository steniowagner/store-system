import { select, put } from 'redux-saga/effects';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Creators as BudgetCreators } from '../ducks/budget';

import {
  CREATE_BUDGET,
  READ_BUDGETS,
  UPDATE_BUDGET,
  DELETE_BUDGET,
} from '../../../back-end/events-handlers/budget/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, BUDGET } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

const parseBudgetToTableView = (budget: Object): Object => ({
  ...budget,
  validityDate: moment(budget.validity, 'YYYY-MM-DD').format('ll'),
  dateToShow: moment().format('ll'),
  subtotalText: `R$ ${parseFloat(budget.subtotal).toFixed(2)}`,
  totalText: `R$ ${parseFloat(budget.total).toFixed(2)}`,
  customerName: budget.customer.name || '-',
});

export function* createBudget(action) {
  try {
    const { args } = action;

    const params = {
      ...args,
      products: JSON.stringify(args.products),
      subtotal: parseFloat(args.subtotal),
      dateToShow: moment().format('ll'),
      total: parseFloat(args.total),
      salesman: 'steniowagner',
    };

    ipcRenderer.send(OPERATION_REQUEST, BUDGET, CREATE_BUDGET, params);

    const { result } = yield handleEventSubscription(BUDGET);

    const newBudget = {
      ...parseBudgetToTableView(params),
      products: JSON.parse(params.products),
      id: result,
    };

    yield put(BudgetCreators.createBudgetSuccess(newBudget));
  } catch (err) {
    yield put(BudgetCreators.createBudgetFailure());
  }
}

export function* getAllBudgets() {
  try {
    moment.locale('pt-br');

    ipcRenderer.send(OPERATION_REQUEST, BUDGET, READ_BUDGETS);

    const { result } = yield handleEventSubscription(BUDGET);

    const allBudgets = result.map(budget => ({
      ...parseBudgetToTableView(budget),
      products: JSON.parse(budget.products),
    }));

    yield put(BudgetCreators.readAllBudgetsSuccess(allBudgets));
  } catch (err) {
    yield put(BudgetCreators.readAllBudgetsFailure());
  }
}

export function* editBudget(action) {
  try {
    const { budget } = action.payload;

    const params = {
      ...budget,
      products: JSON.stringify(budget.products),
      subtotal: parseFloat(budget.subtotal),
      total: parseFloat(budget.total),
    };

    ipcRenderer.send(OPERATION_REQUEST, BUDGET, UPDATE_BUDGET, params);

    yield handleEventSubscription(BUDGET);

    const allBudgets = yield select(state => state.budget.data);

    const budgets = Object.assign([], allBudgets, { [budget.index]: { ...parseBudgetToTableView(budget) } });

    yield put(BudgetCreators.editBudgetSuccess(budgets));
  } catch (err) {
    yield put(BudgetCreators.editBudgetFailure());
  }
}

export function* deleteBudget(action) {
  try {
    const { id } = action.payload;

    ipcRenderer.send(OPERATION_REQUEST, BUDGET, DELETE_BUDGET, id);

    yield handleEventSubscription(BUDGET);

    yield put(BudgetCreators.deleteBudgetSuccess(id));
  } catch (err) {
    yield put(BudgetCreators.deleteBudgetFailure());
  }
}

export const unsubscribeBudgetEvents = () => handleEventUnsubscription(BUDGET);
