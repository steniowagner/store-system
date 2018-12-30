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
};

const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  debits: [],
  data: [],
});

export const Creators = {
  createCustomer: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createCustomerSuccess: customer => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Customer Created Successfully', customer },
  }),

  createCustomerFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'There was a problem when trying to Create Customer' },
  }),

  getAllCustomers: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllCustomersSuccess: customers => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { customers },
  }),

  getAllCustomersFailure: () => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error: 'There was a problem when trying to get Customers from Databse' },
  }),

  editCustomer: customer => ({
    type: Types.EDIT_REQUEST,
    payload: { customer },
  }),

  editCustomerSuccess: customerEdited => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Customer Edited Successfully', customerEdited },
  }),

  editCustomerFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'There was a problem when trying to Edit Customer' },
  }),

  removeCustomer: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeCustomerSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { message: 'Customer Removed Successfully', id },
  }),

  removeCustomerFailure: () => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error: 'There was a problem when trying to Remove Customer' },
  }),
};

const parseCustomer = customer => ({
  ...customer,
  cpfText: customer.cpf || '-',
  rgText: customer.rg || '-',
});

const parseCustomersToTableView = customers => customers.map(customer => parseCustomer(customer));

const customer = (state = INITIAL_STATE, { payload, type }) => {
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
        data: parseCustomersToTableView([payload.customer, ...state.data]),
        message: payload.message,
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
        message: null,
        error: null,
      };

    case Types.GET_ALL_SUCCESS:
      return {
        ...state,
        data: parseCustomersToTableView([...payload.customers]),
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
        message: null,
        error: null,
      };

    case Types.EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        message: payload.message,
        data: state.data.map(customerItem => (customerItem.id === payload.customerEdited.id ? parseCustomer(payload.customerEdited) : customerItem)),
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.REMOVE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.REMOVE_REQUEST_SUCCESS:
      return {
        ...state,
        message: payload.message,
        data: state.data.filter(item => item.id !== payload.id),
      };

    case Types.REMOVE_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default customer;
