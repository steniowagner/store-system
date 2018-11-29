import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'budget/CREATE_REQUEST',
  CREATE_SUCCESS: 'budget/CREATE_SUCCESS',
  CREATE_FAILURE: 'budget/CREATE_FAILURE',

  READ_ALL_REQUEST: 'budget/READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'budget/READ_ALL_SUCCESS',
  READ_ALL_FAILURE: 'budget/READ_ALL_FAILURE',

  EDIT_REQUEST: 'budget/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'budget/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'budget/EDIT_REQUEST_FAILURE',

  DELETE_REQUEST: 'budget/DELETE_REQUEST',
  DELETE_REQUEST_SUCCESS: 'budget/DELETE_REQUEST_SUCCESS',
  DELETE_REQUEST_FAILURE: 'budget/DELETE_REQUEST_FAILURE',

  UNSUBSCRIBE_EVENTS: 'budget/UNSUBSCRIBE_EVENTS',
};

const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  data: [],
});

export const Creators = {
  createBudget: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createBudgetSuccess: budget => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Orçamento Criado com Sucesso', budget },
  }),

  createBudgetFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'Houve um erro ao Criar o Orçamento' },
  }),

  readAllBudgets: () => ({
    type: Types.READ_ALL_REQUEST,
  }),

  readAllBudgetsSuccess: budgets => ({
    type: Types.READ_ALL_SUCCESS,
    payload: { budgets },
  }),

  readAllBudgetsFailure: () => ({
    type: Types.READ_ALL_FAILURE,
    payload: { error: 'Houve um erro ao Ler os Orçamentos' },
  }),

  editBudget: budget => ({
    type: Types.EDIT_REQUEST,
    payload: { budget },
  }),

  editBudgetSuccess: budgets => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { message: 'Orçamento Editado com Sucesso', budgets },
  }),

  editBudgetFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Editar o Orçamento' },
  }),

  deleteBudget: id => ({
    type: Types.DELETE_REQUEST,
    payload: { id },
  }),

  deleteBudgetSuccess: id => ({
    type: Types.DELETE_REQUEST_SUCCESS,
    payload: { message: 'Orçamento Removido com Sucesso', id },
  }),

  deleteBudgetFailure: () => ({
    type: Types.DELETE_REQUEST_FAILURE,
    payload: { error: 'Houve um erro ao Remover o Orçamento' },
  }),

  unsubscribeEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const budget = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.CREATE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.CREATE_SUCCESS:
      return {
        data: [payload.budget, ...state.data],
        message: payload.message,
        error: null,
      };

    case Types.READ_ALL_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.READ_ALL_SUCCESS:
      return {
        ...state,
        data: [...payload.budgets],
      };

    case Types.READ_ALL_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: null,
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
        data: [...payload.budgets],
        message: payload.message,
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: null,
      };

    case Types.DELETE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== payload.id),
        message: payload.message,
      };

    case Types.DELETE_REQUEST_FAILURE:
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

export default budget;
