import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'sale/CREATE_REQUEST',
  CREATE_SUCCESS: 'sale/CREATE_SUCCESS',
  CREATE_FAILURE: 'sale/CREATE_FAILURE',

  GET_ALL_REQUEST: 'sale/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'sale/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'sale/GET_ALL_FAILURE',

  EDIT_REQUEST: 'sale/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'sale/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'sale/EDIT_REQUEST_FAILURE',
};

const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  data: [],
});

export const Creators = {
  createSale: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createSaleSuccess: sale => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Venda Cadastrada com Sucesso', sale },
  }),

  createSaleFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'Houve um Erro ao Cadastrar a Venda' },
  }),

  getAllSales: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllSalesSuccess: sales => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { sales },
  }),

  getAllSalesFailure: () => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error: 'Houve um Erro ao Ler as Vendas' },
  }),

  editSale: sale => ({
    type: Types.EDIT_REQUEST,
    payload: { sale },
  }),

  editSaleSuccess: salesUpdated => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Venda Editada com Sucesso', salesUpdated },
  }),

  editSaleFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'Houve um Erro ao Editar a Venda' },
  }),

  removeSale: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeSaleSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { message: 'Venda Removida com Sucesso', id },
  }),

  removeSaleFailure: () => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error: 'Houve um Erro ao Remover a Venda' },
  }),
};

const sale = (state = INITIAL_STATE, { payload, type }) => {
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
        data: [payload.sale, ...state.data],
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
        data: [...payload.sales],
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
        data: Object.assign([], state.data, { [payload.salesUpdated.index]: payload.salesUpdated }),
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

export default sale;
