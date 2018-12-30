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
    payload: { message: 'Provider Created Sucessfully', provider },
  }),

  createProviderFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'There was a problem when trying to Create Provider' },
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
    payload: { error: 'There was a problem when trying to get the Providers from Database' },
  }),

  editProvider: provider => ({
    type: Types.EDIT_REQUEST,
    payload: { provider },
  }),

  editProviderSuccess: providerEdited => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Provider Edited Successfully', providerEdited },
  }),

  editProviderFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'There was a problem when trying to Edit Provider' },
  }),

  removeProvider: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeProviderSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { message: 'Provider Removed Successfully', id },
  }),

  removeProviderFailure: () => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error: 'There was a problem when trying to Remove Provider' },
  }),
};

const parseProvider = provider => ({ ...provider, addressText: provider.address || '-' });
const parseProvidersToTableView = providers => providers.map(provider => parseProvider(provider));

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
        data: parseProvidersToTableView([payload.provider, ...state.data]),
        message: payload.message,
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
        data: parseProvidersToTableView(payload.providers),
        message: payload.message,
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
        data: state.data.map(providerItem => (providerItem.id === payload.providerEdited.id ? parseProvider(payload.providerEdited) : providerItem)),
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

export default provider;
