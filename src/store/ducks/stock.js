import Immutable from 'seamless-immutable';

export const Types = {
  INSERT_REQUEST: 'stock/INSERT_REQUEST',
  INSERT_SUCCESS: 'stock/INSERT_SUCCESS',
  INSERT_FAILURE: 'stock/INSERT_FAILURE',

  GET_REQUEST: 'stock/GET_REQUEST',
  GET_SUCCESS: 'stock/GET_SUCCESS',
  GET_FAILURE: 'stock/GET_FAILURE',

  EDIT_REQUEST_IN_BATCH: 'stock/EDIT_REQUEST_IN_BATCH',
  EDIT_REQUEST_IN_BATCH_SUCCESS: 'stock/EDIT_REQUEST_IN_BATCH_SUCCESS',
  EDIT_REQUEST_IN_BATCH_FAILURE: 'stock/EDIT_REQUEST_IN_BATCH_FAILURE',

  EDIT_REQUEST: 'stock/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'stock/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'stock/EDIT_REQUEST_FAILURE',
};

const INITIAL_STATE = Immutable({
  message: null,
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

  editStock: productInfo => ({
    type: Types.EDIT_REQUEST,
    payload: { productInfo },
  }),

  editStockSuccess: stockItemEdited => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Stock Edited Successfully', stockItemEdited },
  }),

  editStockFailure: error => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error },
  }),

  editStockInBatch: saleUpdated => ({
    type: Types.EDIT_REQUEST,
    payload: { saleUpdated },
  }),

  editStockInBatchSuccess: stockUpdated => ({
    type: Types.EDIT_REQUEST_IN_BATCH_SUCCESS,
    payload: { stockUpdated },
  }),

  editStockInBatchFailure: error => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error },
  }),
};

const stock = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.INSERT_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.INSERT_SUCCESS:
      return {
        ...state,
        data: [payload.productInfo, ...state.data],
      };

    case Types.INSERT_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.GET_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.GET_SUCCESS:
      return {
        ...state,
        data: [...payload.stock],
      };

    case Types.GET_FAILURE:
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
        data: state.data.map(stockProduct => (stockProduct.id === payload.stockItemEdited.id ? payload.stockItemEdited : stockProduct)),
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.EDIT_REQUEST_IN_BATCH_SUCCESS:
      return {
        ...state,
        data: [...payload.stockUpdated],
      };

    default:
      return state;
  }
};

export default stock;
