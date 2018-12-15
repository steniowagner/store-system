import { select, call, put } from 'redux-saga/effects';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Creators as BudgetCreators } from '../ducks/budget';

import {
  CREATE_BUDGET,
  READ_BUDGETS,
  UPDATE_BUDGET,
  DELETE_BUDGET,
} from '../../../back-end/events-handlers/budget/types';

import { TAKE_AWAY_PRODUCTS_STOCK, UPDATE_PRODUCTS_STOCK, RETURN_PRODUTS_STOCK } from '../../../back-end/events-handlers/stock/types';

import { BUDGET_STATUS } from '../../screens/budget/components/BudgetStatus';
import { BUDGET } from '../../../common/entitiesTypes';

import { getNumberBudgetsOutOfDate } from './alerts';
import { editStockProducts } from './stock';
import execRequest from './execRequest';
import { createSale } from './sale';

const EVENT_TAGS = {
  CONFIRM_PAYMENT_BUDGET: 'BUDGET_CONFIRM_PAYMENT',
  SET_OUTDATED_BUDGET: 'BUDGET_SET_OUTDATED',
  CREATE_BUDGET: 'BUDGET_CREATE',
  UPDATE_BUDGET: 'BUDGET_UPDATE',
  REMOVE_BUDGET: 'BUDGET_REMOVE',
  READ_ALL: 'BUDGET_READ_ALL',
};

const parseBudgetToTableView = (budget: Object): Object => ({
  ...budget,
  validityDate: moment(budget.validity, 'YYYY-MM-DD').format('ll'),
  subtotalText: `R$ ${parseFloat(budget.subtotal).toFixed(2)}`,
  totalText: `R$ ${parseFloat(budget.total).toFixed(2)}`,
  customerName: budget.customer.name || '-',
  dateToShow: moment().format('ll'),
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

    const result = yield call(execRequest, BUDGET, CREATE_BUDGET, EVENT_TAGS.CREATE_BUDGET, params);

    const newBudget = {
      ...parseBudgetToTableView(params),
      products: JSON.parse(params.products),
      id: result,
    };

    yield put(BudgetCreators.createBudgetSuccess(newBudget));
    yield call(editStockProducts, args, [], TAKE_AWAY_PRODUCTS_STOCK);
  } catch (err) {
    yield put(BudgetCreators.createBudgetFailure());
  }
}

export function* getAllBudgets() {
  try {
    moment.locale('pt-br');

    const result = yield call(execRequest, BUDGET, READ_BUDGETS, EVENT_TAGS.READ_ALL);

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
    const allBudgets = yield select(state => state.budget.data);
    const { budget } = action.payload;

    yield call(editStockProducts, budget, allBudgets, UPDATE_PRODUCTS_STOCK);

    const params = {
      ...budget,
      products: JSON.stringify(budget.products),
      subtotal: parseFloat(budget.subtotal),
      total: parseFloat(budget.total),
    };

    yield call(execRequest, BUDGET, UPDATE_BUDGET, EVENT_TAGS.UPDATE_BUDGET, params);

    const budgetUpdated = parseBudgetToTableView(budget);

    yield put(BudgetCreators.editBudgetSuccess(budgetUpdated));
  } catch (err) {
    yield put(BudgetCreators.editBudgetFailure());
  }
}

export function* deleteBudget(action) {
  try {
    const { id } = action.payload;

    const allBudgets = yield select(state => state.budget.data);
    const budgetRemoved = allBudgets.filter(budget => budget.id === id)[0];

    yield call(editStockProducts, budgetRemoved, [], RETURN_PRODUTS_STOCK);
    yield call(execRequest, BUDGET, DELETE_BUDGET, EVENT_TAGS.REMOVE_BUDGET, id);

    yield put(BudgetCreators.deleteBudgetSuccess(id));
    yield call(getNumberBudgetsOutOfDate);
  } catch (err) {
    yield put(BudgetCreators.deleteBudgetFailure());
  }
}

export function* confirmBudgetPayment(action) {
  try {
    const { payload } = action;
    const { budget } = payload;

    const newSaleInfo = Object.assign({}, budget);

    delete newSaleInfo.id; // id from budget

    yield call(createSale, { args: { ...newSaleInfo, createdFromBudget: true } });

    const params = {
      ...budget,
      products: JSON.stringify(budget.products),
      subtotal: parseFloat(budget.subtotal),
      total: parseFloat(budget.total),
    };

    yield call(execRequest, BUDGET, UPDATE_BUDGET, EVENT_TAGS.CONFIRM_PAYMENT_BUDGET, params);
    yield put(BudgetCreators.confirmBudgetPaymentSuccess(budget.id));
    yield call(getNumberBudgetsOutOfDate);
  } catch (err) {
    yield put(BudgetCreators.confirmBudgetPaymentFailure());
  }
}

const getOutdatedBudgets = (budgets) => {
  const today = moment().format('YYYY-MM-DD');

  const budgetsOutdated = budgets.filter((budget) => {
    const budgetValidity = moment(budget.validity, 'YYYY-MM-DD').toDate();

    const isBudgetPending = (budget.status === BUDGET_STATUS.PENDING);
    const isOutdated = moment(today).isAfter(budgetValidity);

    return isBudgetPending && isOutdated;
  });

  return budgetsOutdated;
};

export function* setOutdatedBudgets() {
  try {
    const result = yield call(execRequest, BUDGET, READ_BUDGETS, EVENT_TAGS.SET_OUTDATED_BUDGET);

    const outdatedBudgets = getOutdatedBudgets(result);

    outdatedBudgets.forEach(function* setOutdated(outdatedBudget) {
      const budgetOutdated = {
        ...outdatedBudget,
        status: BUDGET_STATUS.OUT_OF_TIME,
      };

      yield call(execRequest, BUDGET, UPDATE_BUDGET, EVENT_TAGS.UPDATE_BUDGET, budgetOutdated);
    });
  } catch (err) {
    yield put(BudgetCreators.setOutdatedBudgetsFailure());
  }
}
