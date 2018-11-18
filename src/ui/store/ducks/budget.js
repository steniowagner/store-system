import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'budget/CREATE_REQUEST',
  CREATE_SUCCESS: 'budget/CREATE_SUCCESS',
  CREATE_FAILURE: 'budget/CREATE_FAILURE',

  GET_ALL_REQUEST: 'budget/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'budget/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'budget/GET_ALL_FAILURE',

  EDIT_REQUEST: 'budget/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'budget/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'budget/EDIT_REQUEST_FAILURE',

  REMOVE_REQUEST: 'budget/REMOVE_REQUEST',
  REMOVE_REQUEST_SUCCESS: 'budget/REMOVE_REQUEST_SUCCESS',
  REMOVE_REQUEST_FAILURE: 'budget/REMOVE_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'budget/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
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
    payload: { budget },
  }),

  createBudgetFailure: error => ({
    type: Types.CREATE_FAILURE,
    payload: { error },
  }),

  getAllBudgets: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllBudgetsSuccess: budgets => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { budgets },
  }),

  getAllBudgetsFailure: error => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error },
  }),

  editBudget: Budget => ({
    type: Types.EDIT_REQUEST,
    payload: { Budget },
  }),

  editBudgetSuccess: ({ budgetEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { budgetEdited, index },
  }),

  editBudgetFailure: error => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error },
  }),

  removeBudget: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeBudgetSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { id },
  }),

  removeBudgetFailure: error => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error },
  }),

  unsubscribeEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const budget = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.CREATE_REQUEST:
      return {
        ...state,
      };

    case Types.CREATE_SUCCESS:
      return {
        data: [payload.budget, ...state.data],
        error: null,
      };

    case Types.GET_SINGLE_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.GET_ALL_REQUEST:
      return {
        ...state,
      };

    case Types.GET_ALL_SUCCESS:
      return {
        data: [...payload.Budgets],
        error: null,
      };

    case Types.GET_ALL_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.EDIT_REQUEST:
      return {
        ...state,
      };

    case Types.EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        data: Object.assign([], state.data, { [payload.index]: payload.BudgetEdited }),
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.REMOVE_REQUEST:
      return {
        ...state,
      };

    case Types.REMOVE_REQUEST_SUCCESS:
      return {
        data: state.data.filter(item => item.id !== payload.id),
        error: null,
      };

    case Types.REMOVE_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.UNSUBSCRIBE_EVENTS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default budget;
