import Immutable from 'seamless-immutable';

export const Types = {
  CREATE_REQUEST: 'cashier/CREATE_REQUEST',
  CREATE_SUCCESS: 'cashier/CREATE_SUCCESS',
  CREATE_FAILURE: 'cashier/CREATE_FAILURE',

  READ_ALL_REQUEST: 'cashier/READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'cashier/READ_ALL_SUCCESS',
  READ_ALL_FAILURE: 'cashier/READ_ALL_FAILURE',

  EDIT_REQUEST: 'cashier/EDIT_REQUEST',
  EDIT_REQUEST_SUCCESS: 'cashier/EDIT_REQUEST_SUCCESS',
  EDIT_REQUEST_FAILURE: 'cashier/EDIT_REQUEST_FAILURE',

  CREATE_SALE: 'cashier/CREATE_SALE',
  EDIT_SALE: 'cashier/EDIT_SALE',

  SET_CURRENT_CASHIER_TABLE_ITEMS_PER_PAGE: 'cashier/SET_CURRENT_CASHIER_TABLE_ITEMS_PER_PAGE',
  SET_CURRENT_CASHIER_TABLE_PAGE: 'cashier/SET_CURRENT_CASHIER_TABLE_PAGE',

  SET_PAST_CASHIER_TABLE_ITEMS_PER_PAGE: 'cashier/SET_PAST_CASHIER_TABLE_ITEMS_PER_PAGE',
  SET_PAST_CASHIER_TABLE_PAGE: 'cashier/SET_PAST_CASHIER_TABLE_PAGE',

  SET_TAB_INDEX: 'cashier/SET_TAB_INDEX',

  UNSUBSCRIBE_EVENTS: 'cashier/UNSUBSCRIBE_EVENTS',

  CLOSE_CASHIER: 'cashier/CLOSE_CASHIER',
};

const handlePastCashiers = (allPastCashiers, currentCashier) => {
  const cashiersExceptCurrent = allPastCashiers.filter(pastCashier => pastCashier.id !== (currentCashier && currentCashier.id));

  const pastCashiers = cashiersExceptCurrent.map(cashier => ({
    ...cashier,
    initialMoneyCashierText: `R$ ${cashier.initialMoneyCashier.toFixed(2)}`,
    totalOutcomeText: `R$ ${cashier.totalOutcome.toFixed(2)}`,
    totalIncomeText: `R$ ${cashier.totalIncome.toFixed(2)}`,
    totalProfitText: `R$ ${cashier.totalProfit.toFixed(2)}`,
  }));

  return pastCashiers;
};

const INITIAL_STATE = Immutable({
  tabInfo: {
    lastTabIndexSelected: 0,
    currentCashier: {
      currentTablePage: 0,
      itemsPerPage: 5,
    },
    pastCashiers: {
      currentTablePage: 0,
      itemsPerPage: 5,
    },
  },
  isCashierOpen: false,
  currentCashier: {},
  pastCashiers: [],
  message: null,
  error: null,
});

export const Creators = {
  createCashier: args => ({
    type: Types.CREATE_REQUEST,
    args,
  }),

  createCashierSuccess: currentCashier => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: 'Caixa Aberto com Sucesso', currentCashier },
  }),

  createCashierFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'Houve um erro ao Abrir o Caixa' },
  }),

  getAllCashiers: () => ({
    type: Types.READ_ALL_REQUEST,
  }),

  getAllCashiersSuccess: cashiers => ({
    type: Types.READ_ALL_SUCCESS,
    payload: { cashiers },
  }),

  getAllCashiersFailure: () => ({
    type: Types.READ_ALL_FAILURE,
    payload: { error: 'Houve um erro na leitura dos Caixas ' },
  }),

  editCashier: cashier => ({
    type: Types.EDIT_REQUEST,
    payload: { cashier },
  }),

  editCashierSuccess: cashierUpdated => ({
    type: Types.EDIT_REQUEST_SUCCESS,
    payload: { cashierUpdated },
  }),

  editCashierFailure: () => ({
    type: Types.EDIT_REQUEST_FAILURE,
  }),

  onCreateSale: sale => ({
    type: Types.CREATE_SALE,
    payload: { sale },
  }),

  onEditSale: saleEdited => ({
    type: Types.EDIT_SALE,
    payload: { saleEdited },
  }),

  setCurrentCashierTableItemsPerPage: itemsPerPage => ({
    type: Types.SET_CURRENT_CASHIER_TABLE_ITEMS_PER_PAGE,
    payload: { itemsPerPage },
  }),

  setCurrentCashierTablePage: currentPage => ({
    type: Types.SET_CURRENT_CASHIER_TABLE_PAGE,
    payload: { currentPage },
  }),

  setPastCashiersTableItemsPerPage: itemsPerPage => ({
    type: Types.SET_PAST_CASHIER_TABLE_ITEMS_PER_PAGE,
    payload: { itemsPerPage },
  }),

  setPastCashiersTablePage: currentPage => ({
    type: Types.SET_PAST_CASHIER_TABLE_PAGE,
    payload: { currentPage },
  }),

  onCloseCashier: () => ({
    type: Types.CLOSE_CASHIER,
  }),

  setTabIndex: index => ({
    type: Types.SET_TAB_INDEX,
    payload: { index },
  }),

  unsubscribeCashierEvents: () => ({
    type: Types.UNSUBSCRIBE_EVENTS,
  }),
};

const cashier = (state = INITIAL_STATE, { payload, type }) => {
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
        currentCashier: payload.currentCashier,
        message: payload.message,
        isCashierOpen: true,
      };

    case Types.CREATE_FAILURE:
      return {
        ...state,
        error: payload.error,
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
        pastCashiers: handlePastCashiers(payload.cashiers, state.currentCashier),
      };

    case Types.READ_ALL_FAILURE:
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
        currentCashier: {
          ...payload.cashierUpdated,
          operations: JSON.parse(payload.cashierUpdated.operations),
        },
        message: payload.message,
      };

    case Types.EDIT_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case Types.CREATE_SALE:
      return {
        ...state,
        currentCashier: {
          ...state.currentCashier,
          operations: [payload.sale, ...state.currentCashier.operations],
        },
      };

    case Types.EDIT_SALE:
      return {
        ...state,
        currentCashier: {
          ...payload.cashierUpdated,
          operations: JSON.parse(payload.cashierUpdated.operations),
        },
      };

    case Types.SET_CURRENT_CASHIER_TABLE_ITEMS_PER_PAGE:
      return {
        ...state,
        tabInfo: {
          ...state.tabInfo,
          currentCashier: {
            ...state.tabInfo.currentCashier,
            itemsPerPage: payload.itemsPerPage,
          },
        },
      };

    case Types.SET_CURRENT_CASHIER_TABLE_PAGE:
      return {
        ...state,
        tabInfo: {
          ...state.tabInfo,
          currentCashier: {
            ...state.tabInfo.currentCashier,
            currentTablePage: payload.currentPage,
          },
        },
      };

    case Types.SET_PAST_CASHIER_TABLE_ITEMS_PER_PAGE:
      return {
        ...state,
        tabInfo: {
          ...state.tabInfo,
          pastCashiers: {
            ...state.tabInfo.pastCashiers,
            itemsPerPage: payload.itemsPerPage,
          },
        },
      };

    case Types.SET_PAST_CASHIER_TABLE_PAGE:
      return {
        ...state,
        tabInfo: {
          ...state.tabInfo,
          pastCashiers: {
            ...state.tabInfo.pastCashiers,
            currentTablePage: payload.currentPage,
          },
        },
      };

    case Types.SET_TAB_INDEX:
      return {
        ...state,
        tabInfo: {
          ...state.tabInfo,
          lastTabIndexSelected: payload.index,
        },
      };

    case Types.CLOSE_CASHIER:
      return {
        ...state,
        isCashierOpen: false,
      };

    case Types.UNSUBSCRIBE_EVENTS: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default cashier;
