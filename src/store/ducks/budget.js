import Immutable from 'seamless-immutable';

import { BUDGET_STATUS } from '../../screens/budget/components/BudgetStatus';

export const Types = {
  CONFIRM_BUDGET_SALE_REQUEST: 'budget/CONFIRM_BUDGET_SALE_REQUEST',
  CONFIRM_BUDGET_SALE_SUCCESS: 'budget/CONFIRM_BUDGET_SALE_SUCCESS',
  CONFIRM_BUDGET_SALE_FAILURE: 'budget/CONFIRM_BUDGET_SALE_FAILURE',

  CREATE_REQUEST: 'budget/CREATE_REQUEST',
  CREATE_SUCCESS: 'budget/CREATE_SUCCESS',
  CREATE_FAILURE: 'budget/CREATE_FAILURE',

  READ_ALL_REQUEST: 'budget/READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'budget/READ_ALL_SUCCESS',
  READ_ALL_FAILURE: 'budget/READ_ALL_FAILURE',

  EDIT_REQUEST: 'budget/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'budget/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'budget/EDIT_REQUEST_FAILURE',

  DELETE_REQUEST: 'budget/DELETE_REQUEST',
  DELETE_REQUEST_SUCCESS: 'budget/DELETE_REQUEST_SUCCESS',
  DELETE_REQUEST_FAILURE: 'budget/DELETE_REQUEST_FAILURE',

  SET_OUTDATED_ITEMS_REQUEST: 'budget/SET_OUTDATED_ITEMS_REQUEST',
  SET_OUTDATED_ITEMS_FAILURE: 'budget/SET_OUTDATED_ITEMS_FAILURE',
};

const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  data: [],
});

export const Creators = {
  createBudget: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createBudgetSuccess: budget => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Budget Created Successfully', budget },
  }),

  createBudgetFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'There was a problem when trying to Create Budget' },
  }),

  readAllBudgets: () => ({
    type: Types.READ_ALL_REQUEST,
  }),

  readAllBudgetsSuccess: budgets => ({
    type: Types.READ_ALL_SUCCESS,
    payload: { budgets },
  }),

  readAllBudgetsFailure: () => ({
    type: Types.READ_ALL_FAILURE,
    payload: { error: 'There was a problem when trying to get Budgets from Database' },
  }),

  editBudget: budget => ({
    type: Types.EDIT_REQUEST,
    payload: { budget },
  }),

  editBudgetSuccess: budgetUpdated => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Budget Edited Successfully', budgetUpdated },
  }),

  editBudgetFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'There was a problem when trying to Edit Budget' },
  }),

  deleteBudget: id => ({
    type: Types.DELETE_REQUEST,
    payload: { id },
  }),

  deleteBudgetSuccess: id => ({
    type: Types.DELETE_REQUEST_SUCCESS,
    payload: { message: 'Budget Removed Successfully', id },
  }),

  deleteBudgetFailure: () => ({
    type: Types.DELETE_REQUEST_FAILURE,
    payload: { error: 'There was a problem  when trying to Remove Budget' },
  }),

  confirmBudgetPayment: budget => ({
    type: Types.CONFIRM_BUDGET_SALE_REQUEST,
    payload: { budget },
  }),

  confirmBudgetPaymentSuccess: id => ({
    type: Types.CONFIRM_BUDGET_SALE_SUCCESS,
    payload: { message: 'Budget\'s payment was Consolidated Successfully', id },
  }),

  confirmBudgetPaymentFailure: () => ({
    type: Types.CONFIRM_BUDGET_SALE_FAILURE,
    payload: { error: 'There was a problem when trying to Consolidate Budget\'s Payment' },
  }),

  setOutdatedBudgets: () => ({
    type: Types.SET_OUTDATED_ITEMS_REQUEST,
  }),

  setOutdatedBudgetsFailure: () => ({
    type: Types.SET_OUTDATED_ITEMS_FAILURE,
    payload: { error: 'There was a problem when trying to Update Budgets Out of Time' },
  }),
};

const budget = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.CREATE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.CREATE_SUCCESS:
      return {
        data: [payload.budget, ...state.data],
        message: payload.message,
        error: null,
      };

    case Types.READ_ALL_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.READ_ALL_SUCCESS:
      return {
        ...state,
        data: [...payload.budgets],
      };

    case Types.READ_ALL_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: null,
      };

    case Types.EDIT_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        data: Object.assign([], state.data, { [payload.budgetUpdated.index]: payload.budgetUpdated }),
        message: payload.message,
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: null,
      };

    case Types.DELETE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== payload.id),
        message: payload.message,
      };

    case Types.DELETE_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.CONFIRM_BUDGET_SALE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.CONFIRM_BUDGET_SALE_SUCCESS:
      return {
        ...state,
        data: state.data.map(budgetItem => (budgetItem.id === payload.id
          ? { ...budgetItem, status: BUDGET_STATUS.APPROVED } : budgetItem)),
        message: payload.message,
      };

    case Types.CONFIRM_BUDGET_SALE_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.SET_OUTDATED_ITEMS_REQUEST:
      return {
        ...state,
      };

    case Types.SET_OUTDATED_ITEMS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default budget;
