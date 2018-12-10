import Immutable from 'seamless-immutable';

export const Types = {
  GET_ALL_REQUEST: 'brand/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'brand/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'brand/GET_ALL_FAILURE',
};

const INITIAL_STATE = Immutable({
  error: null,
  data: [],
});

export const Creators = {
  getAllBrands: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllBrandsSuccess: brands => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { brands },
  }),

  getAllBrandsFailure: error => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error },
  }),
};

const brand = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.GET_ALL_REQUEST:
      return {
        ...state,
      };

    case Types.GET_ALL_SUCCESS:
      return {
        data: payload.brands,
        error: null,
      };

    case Types.GET_ALL_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default brand;
