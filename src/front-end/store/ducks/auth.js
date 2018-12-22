import Immutable from 'seamless-immutable';

export const Types = {
  LOGOUT: 'auth/LOGOUT',
  LOGIN: 'auth/LOGIN',
};

const INITIAL_STATE = Immutable({
  isAuthenticated: false,
  user: null,
});

export const Creators = {
  login: user => ({
    type: Types.LOGIN,
    payload: { user },
  }),

  logout: () => ({
    type: Types.LOGOUT,
  }),
};

const auth = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.LOGIN:
      return {
        isAuthenticated: true,
        user: payload.user,
      };

    case Types.LOGOUT:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default auth;
