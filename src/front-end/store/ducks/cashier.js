import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'cashier/CREATE_REQUEST',
  CREATE_SUCCESS: 'cashier/CREATE_SUCCESS',
  CREATE_FAILURE: 'cashier/CREATE_FAILURE',

  READ_ALL_REQUEST: 'cashier/READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'cashier/READ_ALL_SUCCESS',
  READ_ALL_FAILURE: 'cashier/READ_ALL_FAILURE',

  EDIT_REQUEST: 'cashier/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'cashier/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'cashier/EDIT_REQUEST_FAILURE',

  CLOSE_REQUEST: 'cashier/CLOSE_REQUEST',
  CLOSE_REQUEST_SUCCESS: 'cashier/CLOSE_REQUEST_SUCCESS',
  CLOSE_REQUEST_FAILURE: 'cashier/CLOSE_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'cashier/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
  isCashierOpen: false,
  currentCashier: {},
  pastCashiers: [],
  message: null,
  error: null,
});

export const Creators = {
  createCashier: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createCashierSuccess: currentCashier => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Caixa Aberto com Sucesso', currentCashier },
  }),

  createCashierFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'Houve um erro ao Abrir o Caixa' },
  }),

  readAllCashiers: () => ({
    type: Types.READ_ALL_REQUEST,
  }),

  readAllCashiersSuccess: cashiers => ({
    type: Types.READ_ALL_SUCCESS,
    payload: { cashiers },
  }),

  readAllCashiersFailure: () => ({
    type: Types.READ_ALL_FAILURE,
    payload: { error: 'Houve um erro na leitura dos Caixas' },
  }),

  editCashier: cashier => ({
    type: Types.EDIT_REQUEST,
    payload: { cashier },
  }),

  editCashierSuccess: cashierUpdated => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { cashierUpdated },
  }),

  editCashierFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
  }),

  unsubscribeCashierEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const cashier = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.CREATE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.CREATE_SUCCESS:
      return {
        ...state,
        currentCashier: payload.currentCashier,
        message: payload.message,
        isCashierOpen: true,
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
        pastCashiers: [...payload.cashiers],
      };

    case Types.READ_ALL_FAILURE:
      return {
        ...state,
        error: payload.error,
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
        currentCashier: {
          ...payload.cashierUpdated,
          operations: JSON.parse(payload.cashierUpdated.operations),
        },
        message: payload.message,
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.UNSUBSCRIBE_EVENTS: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
};

export default cashier;
