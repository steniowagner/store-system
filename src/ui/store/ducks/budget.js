import Immutable from 'seamless-immutable';

export const Types = {
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

  readAllBudgets: () => ({
    type: Types.READ_ALL_REQUEST,
  }),

  readAllBudgetsSuccess: budgets => ({
    type: Types.READ_ALL_SUCCESS,
    payload: { budgets },
  }),

  readAllBudgetsFailure: error => ({
    type: Types.READ_ALL_FAILURE,
    payload: { error },
  }),

  editBudget: budget => ({
    type: Types.EDIT_REQUEST,
    payload: { budget },
  }),

  editBudgetSuccess: ({ budgetEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { budgetEdited, index },
  }),

  editBudgetFailure: error => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error },
  }),

  deleteBudget: id => ({
    type: Types.DELETE_REQUEST,
    payload: { id },
  }),

  deleteBudgetSuccess: id => ({
    type: Types.DELETE_REQUEST_SUCCESS,
    payload: { id },
  }),

  deleteBudgetFailure: error => ({
    type: Types.DELETE_REQUEST_FAILURE,
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

    case Types.READ_SINGLE_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.READ_ALL_REQUEST:
      return {
        ...state,
      };

    case Types.READ_ALL_SUCCESS:
      return {
        data: [...payload.budgets],
        error: null,
      };

    case Types.READ_ALL_FAILURE:
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
        data: Object.assign([], state.data, { [payload.index]: payload.budgetEdited }),
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.DELETE_REQUEST:
      return {
        ...state,
      };

    case Types.DELETE_REQUEST_SUCCESS:
      return {
        data: state.data.filter(item => item.id !== payload.id),
        error: null,
      };

    case Types.DELETE_REQUEST_FAILURE:
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
