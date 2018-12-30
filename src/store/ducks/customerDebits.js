import Immutable from 'seamless-immutable';

export const Types = {
  GET_DEBITS_REQUEST: 'debits/GET_DEBITS_REQUEST',
  GET_DEBITS_SUCCESS: 'debits/GET_DEBITS_SUCCESS',
  GET_DEBITS_FAILURE: 'debits/GET_DEBITS_FAILURE',

  REMOVE_DEBITS_REQUEST: 'debits/REMOVE_DEBITS_REQUEST',
  REMOVE_DEBITS_SUCCESS: 'debits/REMOVE_DEBITS_SUCCESS',
  REMOVE_DEBITS_FAILURE: 'debits/REMOVE_DEBITS_FAILURE',
};

const INITIAL_STATE = Immutable({
  data: [],
  message: null,
  error: null,
});

export const Creators = {
  getDebits: id => ({
    type: Types.GET_DEBITS_REQUEST,
    payload: { id },
  }),

  getDebitsSuccess: sales => ({
    type: Types.GET_DEBITS_SUCCESS,
    payload: { sales },
  }),

  getDebitsFailure: error => ({
    type: Types.GET_DEBITS_FAILURE,
    payload: { error },
  }),

  removeDebit: sale => ({
    type: Types.REMOVE_DEBITS_REQUEST,
    payload: { sale },
  }),

  removeDebitSuccess: id => ({
    type: Types.REMOVE_DEBITS_SUCCESS,
    payload: { id },
  }),

  removeDebitFailure: error => ({
    type: Types.REMOVE_DEBITS_FAILURE,
    payload: { error },
  }),
};

const customerDebit = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.GET_DEBITS_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.GET_DEBITS_SUCCESS:
      return {
        ...state,
        data: payload.sales.map(sale => ({
          ...sale,
          paidValueText: `$ ${(sale.total - sale.inDebit).toFixed(2)}`,
          subtotalText: `$ ${sale.subtotal.toFixed(2)}`,
          inDebitText: `$ ${sale.inDebit.toFixed(2)}`,
          totalText: `$ ${sale.total.toFixed(2)}`,
        })),
      };

    case Types.GET_DEBITS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.REMOVE_DEBITS_REQUEST:
      return {
        ...state,
      };

    case Types.REMOVE_DEBITS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(sale => sale.id !== payload.id),
      };

    case Types.REMOVE_DEBITS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default customerDebit;
