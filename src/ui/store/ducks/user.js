import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'user/CREATE_REQUEST',
  CREATE_SUCCESS: 'user/CREATE_SUCCESS',
  CREATE_FAILURE: 'user/CREATE_FAILURE',

  GET_ALL_REQUEST: 'user/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'user/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'user/GET_ALL_FAILURE',

  EDIT_REQUEST: 'user/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'user/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'user/EDIT_REQUEST_FAILURE',

  REMOVE_REQUEST: 'user/REMOVE_REQUEST',
  REMOVE_REQUEST_SUCCESS: 'user/REMOVE_REQUEST_SUCCESS',
  REMOVE_REQUEST_FAILURE: 'user/REMOVE_REQUEST_FAILURE',
};

const INITIAL_STATE = Immutable({
  error: null,
  data: [],
});

export const Creators = {
  createUser: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createUserSuccess: user => ({
    type: Types.CREATE_SUCCESS,
    payload: { user },
  }),

  createUserFailure: error => ({
    type: Types.CREATE_FAILURE,
    payload: { error },
  }),

  getAllUsers: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllUsersSuccess: users => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { users },
  }),

  getAllUsersFailure: error => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error },
  }),

  editUser: user => ({
    type: Types.EDIT_REQUEST,
    payload: { user },
  }),

  editUserSuccess: ({ userEdited, index }) => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { userEdited, index },
  }),

  editUserFailure: error => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error },
  }),

  removeUser: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeUserSuccess: id => ({
    type: Types.REMOVE_REQUEST_SUCCESS,
    payload: { id },
  }),

  removeUserFailure: error => ({
    type: Types.REMOVE_REQUEST_FAILURE,
    payload: { error },
  }),
};

const user = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.CREATE_REQUEST:
      return {
        ...state,
      };

    case Types.CREATE_SUCCESS:
      return {
        data: [payload.user, ...state.data],
        error: null,
      };

    case Types.GET_SINGLE_FAILURE:
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
        data: [...payload.users],
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
      return {
        ...state,
        data: Object.assign([], state.data, { [payload.index]: payload.userEdited }),
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

    default:
      return state;
  }
};

export default user;
