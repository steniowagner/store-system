import Immutable from 'seamless-immutable';

export const Types = {
  GET_ALL_STOCK_UNDER_MIN_REQUEST: 'alerts/GET_ALL_STOCK_UNDER_MIN_REQUEST',
  GET_ALL_STOCK_UNDER_MIN_SUCCESS: 'alerts/GET_ALL_STOCK_UNDER_MIN_SUCCESS',
  GET_ALL_STOCK_UNDER_MIN_FAILURE: 'alerts/GET_ALL_STOCK_UNDER_MIN_FAILURE',

  GET_ALL_CUSTOMERS_WITH_DEBIT_REQUEST: 'alerts/GET_ALL_CUSTOMERS_WITH_DEBIT_REQUEST',
  GET_ALL_CUSTOMERS_WITH_DEBIT_SUCCESS: 'alerts/GET_ALL_CUSTOMERS_WITH_DEBIT_SUCCESS',
  GET_ALL_CUSTOMERS_WITH_DEBIT_FAILURE: 'alerts/GET_ALL_CUSTOMERS_WITH_DEBIT_FAILURE',

  GET_ALL_BUDGETS_OUT_OF_DATE_REQUEST: 'alerts/GET_ALL_BUDGETS_OUT_OF_DATE_REQUEST',
  GET_ALL_BUDGETS_OUT_OF_DATE_SUCCESS: 'alerts/GET_ALL_BUDGETS_OUT_OF_DATE_SUCCESS',
  GET_ALL_BUDGETS_OUT_OF_DATE_FAILURE: 'alerts/GET_ALL_BUDGETS_OUT_OF_DATE_FAILURE',
};

const INITIAL_STATE = Immutable({
  numberBudgetsOutOfDate: 0,
  numberCustomersInDebit: 0,
  numberStockUnderMin: 0,
});

export const Creators = {
  getNumberBudgetsOutOfDate: () => ({
    type: Types.GET_ALL_STOCK_UNDER_MIN_REQUEST,
  }),

  getNumberBudgetsOutOfDateSuccess: numberBudgetsOutOfDate => ({
    type: Types.GET_ALL_STOCK_UNDER_MIN_SUCCESS,
    payload: { numberBudgetsOutOfDate },
  }),

  getNumberBudgetsOutOfDateFailure: () => ({
    type: Types.GET_ALL_STOCK_UNDER_MIN_FAILURE,
  }),

  getNumberCustomersInDebit: () => ({
    type: Types.GET_ALL_CUSTOMERS_WITH_DEBIT_REQUEST,
  }),

  getNumberCustomersInDebitSuccess: numberCustomersInDebit => ({
    type: Types.GET_ALL_CUSTOMERS_WITH_DEBIT_SUCCESS,
    payload: { numberCustomersInDebit },
  }),

  getNumberCustomersInDebitFailure: () => ({
    type: Types.GET_ALL_CUSTOMERS_WITH_DEBIT_FAILURE,
  }),

  getNumberStockUnderMin: () => ({
    type: Types.GET_ALL_BUDGETS_OUT_OF_DATE_REQUEST,
  }),

  getNumberStockUnderMinSuccess: numberStockUnderMin => ({
    type: Types.GET_ALL_BUDGETS_OUT_OF_DATE_SUCCESS,
    payload: { numberStockUnderMin },
  }),

  getNumberStockUnderMinFailure: () => ({
    type: Types.GET_ALL_BUDGETS_OUT_OF_DATE_FAILURE,
  }),
};

const brand = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.GET_ALL_STOCK_UNDER_MIN_REQUEST:
      return {
        ...state,
      };

    case Types.GET_ALL_STOCK_UNDER_MIN_SUCCESS:
      return {
        ...state,
        numberBudgetsOutOfDate: payload.numberBudgetsOutOfDate,
      };

    case Types.GET_ALL_STOCK_UNDER_MIN_FAILURE:
      return {
        ...state,
      };

    case Types.GET_ALL_CUSTOMERS_WITH_DEBIT_REQUEST:
      return {
        ...state,
      };

    case Types.GET_ALL_CUSTOMERS_WITH_DEBIT_SUCCESS:
      return {
        ...state,
        numberCustomersInDebit: payload.numberCustomersInDebit,
      };

    case Types.GET_ALL_CUSTOMERS_WITH_DEBIT_FAILURE:
      return {
        ...state,
      };

    case Types.GET_ALL_BUDGETS_OUT_OF_DATE_REQUEST:
      return {
        ...state,
      };

    case Types.GET_ALL_BUDGETS_OUT_OF_DATE_SUCCESS:
      return {
        ...state,
        numberStockUnderMin: payload.numberStockUnderMin,
      };

    case Types.GET_ALL_BUDGETS_OUT_OF_DATE_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default brand;
