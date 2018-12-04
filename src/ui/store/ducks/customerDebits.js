import Immutable from 'seamless-immutable';

export const Types = {
  GET_DEBITS_REQUEST: 'debits/GET_DEBITS_REQUEST',
  GET_DEBITS_SUCCESS: 'debits/GET_DEBITS_SUCCESS',
  GET_DEBITS_FAILURE: 'debits/GET_DEBITS_FAILURE',
};

const INITIAL_STATE = Immutable({
  data: [],
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
};

const customer = (state = INITIAL_STATE, { payload, type }) => {
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
          paidValueText: `R$ ${(sale.total - sale.inDebit).toFixed(2)}`,
          subtotalText: `R$ ${sale.subtotal.toFixed(2)}`,
          inDebitText: `R$ ${sale.inDebit.toFixed(2)}`,
          totalText: `R$ ${sale.total.toFixed(2)}`,
        })),
      };

    case Types.GET_DEBITS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default customer;
