import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'customer/CREATE_REQUEST',
  CREATE_SUCCESS: 'customer/CREATE_SUCCESS',
  CREATE_FAILURE: 'customer/CREATE_FAILURE',

  GET_ALL_REQUEST: 'customer/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'customer/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'customer/GET_ALL_FAILURE',

  EDIT_REQUEST: 'customer/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'customer/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'customer/EDIT_REQUEST_FAILURE',

  REMOVE_REQUEST: 'customer/REMOVE_REQUEST',
  REMOVE_REQUEST_SUCCESS: 'customer/REMOVE_REQUEST_SUCCESS',
  REMOVE_REQUEST_FAILURE: 'customer/REMOVE_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'customer/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
  error: null,
  data: [],
});

export const Creators = {
  createCustomer: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createCustomerSuccess: customer => ({
    type: Types.CREATE_SUCCESS,
    payload: { customer },
  }),

  createCustomerFailure: error => ({
    type: Types.CREATE_FAILURE,
    payload: { error },
  }),

  getAllCustomers: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllCustomersSuccess: customers => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { customers },
  }),

  getAllCustomersFailure: error => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error },
  }),

  editCustomer: customer => ({
    type: Types.EDIT_REQUEST,
    payload: { customer },
  }),

  editCustomerSuccess: ({ customerEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { customerEdited, index },
  }),

  editCustomerFailure: error => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error },
  }),

  removeCustomer: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeCustomerSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { id },
  }),

  removeCustomerFailure: error => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error },
  }),

  unsubscribeEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const customer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.CREATE_REQUEST:
      return {
        ...state,
      };

    case Types.CREATE_SUCCESS:
      return {
        data: [payload.customer, ...state.data],
        error: null,
      };

    case Types.CREATE_FAILURE:
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
        data: [...payload.customers],
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
      console.log()
      return {
        ...state,
        data: Object.assign([], state.data, { [payload.index]: payload.customerEdited }),
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

export default customer;
