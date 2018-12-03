import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'product/CREATE_REQUEST',
  CREATE_SUCCESS: 'product/CREATE_SUCCESS',
  CREATE_FAILURE: 'product/CREATE_FAILURE',

  GET_ALL_REQUEST: 'product/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'product/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'product/GET_ALL_FAILURE',

  EDIT_REQUEST: 'product/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'product/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'product/EDIT_REQUEST_FAILURE',

  REMOVE_REQUEST: 'product/REMOVE_REQUEST',
  REMOVE_REQUEST_SUCCESS: 'product/REMOVE_REQUEST_SUCCESS',
  REMOVE_REQUEST_FAILURE: 'product/REMOVE_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'product/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  data: [],
});

export const Creators = {
  createProduct: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createProductSuccess: product => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Produto Cadastrado com Sucesso', product },
  }),

  createProductFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'Houve um erro ao Cadastrar o Produto' },
  }),

  getAllProducts: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllProductsSuccess: products => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { products },
  }),

  getAllProductsFailure: error => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error },
  }),

  editProduct: product => ({
    type: Types.EDIT_REQUEST,
    payload: { product },
  }),

  editProductSuccess: ({ productEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Produto Editado com Sucesso', productEdited, index },
  }),

  editProductFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Editar o Produto' },
  }),

  removeProduct: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeProductSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { message: 'Produto Removido com Sucesso', id },
  }),

  removeProductFailure: () => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Remover o Produto' },
  }),

  unsubscribeProductEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const product = (state = INITIAL_STATE, { payload, type }) => {
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
        message: payload.message,
        data: [payload.product, ...state.data],
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
        data: [...payload.products],
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
        data: Object.assign([], state.data, { [payload.index]: payload.productEdited }),
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

    case Types.UNSUBSCRIBE_EVENTS:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default product;
