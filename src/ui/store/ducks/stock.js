import Immutable from 'seamless-immutable';

export const Types = {
  INSERT_REQUEST: 'stock/INSERT_REQUEST',
  INSERT_SUCCESS: 'stock/INSERT_SUCCESS',
  INSERT_FAILURE: 'stock/INSERT_FAILURE',

  GET_REQUEST: 'stock/GET_REQUEST',
  GET_SUCCESS: 'stock/GET_SUCCESS',
  GET_FAILURE: 'stock/GET_FAILURE',

  EDIT_REQUEST: 'stock/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'stock/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'stock/EDIT_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'stock/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
  error: null,
  data: [],
});

export const Creators = {
  insertProduct: args => ({
    type: Types.INSERT_REQUEST,
    args,
  }),

  insertProductSuccess: user => ({
    type: Types.INSERT_SUCCESS,
    payload: { user },
  }),

  insertProductFailure: error => ({
    type: Types.INSERT_FAILURE,
    payload: { error },
  }),

  getStock: () => ({
    type: Types.GET_REQUEST,
  }),

  getStockSuccess: stock => ({
    type: Types.GET_SUCCESS,
    payload: { stock },
  }),

  getStockFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),

  editProduct: productInfo => ({
    type: Types.EDIT_REQUEST,
    payload: { productInfo },
  }),

  editProductSuccess: ({ productInfoEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { productInfoEdited, index },
  }),

  editProductFailure: error => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error },
  }),

  unsubscribeEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const stock = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.INSERT_REQUEST:
      return {
        ...state,
      };

    case Types.INSERT_SUCCESS:
      return {
        data: [payload.productInfo, ...state.data],
        error: null,
      };

    case Types.INSERT_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.GET_REQUEST:
      return {
        ...state,
      };

    case Types.GET_SUCCESS:
      return {
        data: [...payload.productsInfo],
        error: null,
      };

    case Types.GET_FAILURE:
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
        data: Object.assign([], state.data, { [payload.index]: payload.productInfoEdited }),
      };

    case Types.EDIT_REQUEST_FAILURE:
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

export default stock;
