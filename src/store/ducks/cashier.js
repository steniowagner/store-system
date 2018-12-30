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

  SET_PAST_CASHIER_TABLE_ITEMS_PER_PAGE: 'cashier/SET_PAST_CASHIER_TABLE_ITEMS_PER_PAGE',
  SET_PAST_CASHIER_DATE_FILTER_VALUE: 'cashier/SET_PAST_CASHIER_DATE_FILTER_VALUE',
  SET_PAST_CASHIER_TABLE_PAGE: 'cashier/SET_PAST_CASHIER_TABLE_PAGE',

  SET_CURRENT_CASHIER_TABLE_ITEMS_PER_PAGE: 'cashier/SET_CURRENT_CASHIER_TABLE_ITEMS_PER_PAGE',
  SET_CURRENT_CASHIER_TABLE_PAGE: 'cashier/SET_CURRENT_CASHIER_TABLE_PAGE',

  CREATE_SALE: 'cashier/CREATE_SALE',
  EDIT_SALE: 'cashier/EDIT_SALE',

  SET_TAB_INDEX: 'cashier/SET_TAB_INDEX',

  CLOSE_CASHIER: 'cashier/CLOSE_CASHIER',

  RESET_MESSAGES: 'cashier/RESET_MESSAGES',
};

const handlePastCashiers = (allPastCashiers, state) => {
  const { currentCashier, isCashierOpen } = state;

  const cashiersExceptCurrent = allPastCashiers.filter((pastCashier) => {
    const isCheckingCurrentCashier = (pastCashier.id === currentCashier.id);
    const isCurrentCashierAlreadyClosed = (isCheckingCurrentCashier && !isCashierOpen);

    return (!isCheckingCurrentCashier || isCurrentCashierAlreadyClosed);
  });

  const pastCashiers = cashiersExceptCurrent.map(cashier => ({
    ...cashier,
    initialMoneyCashierText: `$ ${cashier.initialMoneyCashier.toFixed(2)}`,
    totalOutcomeText: `$ ${cashier.totalOutcome.toFixed(2)}`,
    totalIncomeText: `$ ${cashier.totalIncome.toFixed(2)}`,
    totalProfitText: `$ ${cashier.totalProfit.toFixed(2)}`,
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
      dateFilterValue: '',
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
    payload: { message: 'All Cashier Operations are Released', currentCashier },
  }),

  createCashierFailure: () => ({
    type: Types.CREATE_FAILURE,
    payload: { error: 'There was a problem when trying to Open Cashier' },
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
    payload: { error: 'There was a problem when trying to get Cashiers from Database' },
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

  setPastCashierDateFilter: filterValue => ({
    type: Types.SET_PAST_CASHIER_DATE_FILTER_VALUE,
    payload: { filterValue },
  }),

  setPastCashiersTablePage: currentPage => ({
    type: Types.SET_PAST_CASHIER_TABLE_PAGE,
    payload: { currentPage },
  }),

  onCloseCashier: () => ({
    type: Types.CLOSE_CASHIER,
    payload: { message: 'Cashier Closed Successfully' },
  }),

  setTabIndex: index => ({
    type: Types.SET_TAB_INDEX,
    payload: { index },
  }),

  resetMessages: () => ({
    type: Types.RESET_MESSAGES,
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
        pastCashiers: handlePastCashiers(payload.cashiers, state),
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
        currentCashier:
          (payload.cashierUpdated.id === state.currentCashier.id
            ? ({
              ...payload.cashierUpdated,
              operations: payload.cashierUpdated.operations,
            })
            : state.currentCashier
          ),
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
          operations: payload.cashierUpdated.operations,
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

    case Types.SET_PAST_CASHIER_DATE_FILTER_VALUE:
      return {
        ...state,
        tabInfo: {
          ...state.tabInfo,
          pastCashiers: {
            ...state.tabInfo.pastCashiers,
            dateFilterValue: payload.filterValue,
          },
        },
      };

    case Types.CLOSE_CASHIER:
      return {
        ...state,
        isCashierOpen: false,
        message: payload.message,
      };

    case Types.RESET_MESSAGES:
      return {
        ...state,
        message: '',
        error: '',
      };

    default:
      return state;
  }
};

export default cashier;
