import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'provider/CREATE_REQUEST',
  CREATE_SUCCESS: 'provider/CREATE_SUCCESS',
  CREATE_FAILURE: 'provider/CREATE_FAILURE',

  GET_ALL_REQUEST: 'provider/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'provider/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'provider/GET_ALL_FAILURE',

  EDIT_REQUEST: 'provider/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'provider/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'provider/EDIT_REQUEST_FAILURE',

  REMOVE_REQUEST: 'provider/REMOVE_REQUEST',
  REMOVE_REQUEST_SUCCESS: 'provider/REMOVE_REQUEST_SUCCESS',
  REMOVE_REQUEST_FAILURE: 'provider/REMOVE_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'provider/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  data: [],
});

export const Creators = {
  createProvider: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createProviderSuccess: provider => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Fornecedor Cadastrado com Suceso', provider },
  }),

  createProviderFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'Houve um Erro ao Cadastrar o Fornecedor' },
  }),

  getAllProviders: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllProvidersSuccess: providers => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { providers },
  }),

  getAllProvidersFailure: () => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error: 'Houve um Erro ao Ler os Fornecedores' },
  }),

  editProvider: provider => ({
    type: Types.EDIT_REQUEST,
    payload: { provider },
  }),

  editProviderSuccess: ({ providerEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Fornecedor Editado com Sucesso', providerEdited, index },
  }),

  editProviderFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Editar o Fornecedor' },
  }),

  removeProvider: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeProviderSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { message: 'Fornecedor Removido com Sucesso', id },
  }),

  removeProviderFailure: () => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Remover o Fornecedor' },
  }),

  unsubscribeProviderEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const provider = (state = INITIAL_STATE, { payload, type }) => {
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
        data: [payload.provider, ...state.data],
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
        message: payload.message,
        data: [...payload.providers],
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
        data: Object.assign([], state.data, { [payload.index]: payload.providerEdited }),
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

export default provider;
