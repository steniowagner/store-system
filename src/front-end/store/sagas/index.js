import { all, takeLatest } from 'redux-saga/effects';

import { Types as CustomerDebitsTypes } from '../ducks/customerDebits';
import { Types as CustomerTypes } from '../ducks/customer';
import { Types as ProviderTypes } from '../ducks/provider';
import { Types as ProductTypes } from '../ducks/product';
import { Types as CashierTypes } from '../ducks/cashier';
import { Types as BudgetTypes } from '../ducks/budget';
import { Types as StockTypes } from '../ducks/stock';
import { Types as BrandTypes } from '../ducks/brand';
import { Types as UserTypes } from '../ducks/user';
import { Types as SaleTypes } from '../ducks/sale';

import {
  unsubscribeUserEvents,
  createUser,
  getAllUsers,
  editUser,
  removeUser,
} from './user';

import {
  unsubscribeCustomerEvents,
  createCustomer,
  getAllCustomers,
  editCustomer,
  removeCustomer,
} from './customer';

import {
  unsubscribeProductEvents,
  createProduct,
  getAllProducts,
  editProduct,
  removeProduct,
} from './product';

import {
  unsubscribeProviderEvents,
  createProvider,
  getAllProviders,
  editProvider,
  removeProvider,
} from './provider';

import {
  unsubscribeStockEvents,
  editProductInStock,
  insertProduct,
  getStock,
} from './stock';

import {
  unsubscribeBudgetEvents,
  setOutdatedBudgets,
  confirmBudgetPayment,
  getAllBudgets,
  createBudget,
  editBudget,
  deleteBudget,
} from './budget';

import {
  unsubscribeCashierEvents,
  createCashier,
  editCashier,
} from './cashier';

import {
  unsubscribeSaleEvents,
  getAllSales,
  createSale,
  editSale,
} from './sale';

import { getCustomerDebits, removeDebit } from './customerDebits';

import { getAllBrands } from './brand';

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.UNSUBSCRIBE_EVENTS, unsubscribeUserEvents),
    takeLatest(UserTypes.CREATE_REQUEST, createUser),
    takeLatest(UserTypes.GET_ALL_REQUEST, getAllUsers),
    takeLatest(UserTypes.EDIT_REQUEST, editUser),
    takeLatest(UserTypes.REMOVE_REQUEST, removeUser),

    takeLatest(ProviderTypes.UNSUBSCRIBE_EVENTS, unsubscribeProviderEvents),
    takeLatest(ProviderTypes.CREATE_REQUEST, createProvider),
    takeLatest(ProviderTypes.GET_ALL_REQUEST, getAllProviders),
    takeLatest(ProviderTypes.EDIT_REQUEST, editProvider),
    takeLatest(ProviderTypes.REMOVE_REQUEST, removeProvider),

    takeLatest(CustomerTypes.UNSUBSCRIBE_EVENTS, unsubscribeCustomerEvents),
    takeLatest(CustomerTypes.CREATE_REQUEST, createCustomer),
    takeLatest(CustomerTypes.GET_ALL_REQUEST, getAllCustomers),
    takeLatest(CustomerTypes.EDIT_REQUEST, editCustomer),
    takeLatest(CustomerTypes.REMOVE_REQUEST, removeCustomer),

    takeLatest(ProductTypes.UNSUBSCRIBE_EVENTS, unsubscribeProductEvents),
    takeLatest(ProductTypes.CREATE_REQUEST, createProduct),
    takeLatest(ProductTypes.GET_ALL_REQUEST, getAllProducts),
    takeLatest(ProductTypes.EDIT_REQUEST, editProduct),
    takeLatest(ProductTypes.REMOVE_REQUEST, removeProduct),

    takeLatest(StockTypes.UNSUBSCRIBE_EVENTS, unsubscribeStockEvents),
    takeLatest(StockTypes.INSERT_REQUEST, insertProduct),
    takeLatest(StockTypes.EDIT_REQUEST, editProductInStock),
    takeLatest(StockTypes.GET_REQUEST, getStock),

    takeLatest(SaleTypes.UNSUBSCRIBE_EVENTS, unsubscribeSaleEvents),
    takeLatest(SaleTypes.CREATE_REQUEST, createSale),
    takeLatest(SaleTypes.GET_ALL_REQUEST, getAllSales),
    takeLatest(SaleTypes.EDIT_REQUEST, editSale),

    takeLatest(BudgetTypes.CONFIRM_BUDGET_SALE_REQUEST, confirmBudgetPayment),
    takeLatest(BudgetTypes.SET_OUTDATED_ITEMS_REQUEST, setOutdatedBudgets),
    takeLatest(BudgetTypes.UNSUBSCRIBE_EVENTS, unsubscribeBudgetEvents),
    takeLatest(BudgetTypes.CREATE_REQUEST, createBudget),
    takeLatest(BudgetTypes.READ_ALL_REQUEST, getAllBudgets),
    takeLatest(BudgetTypes.EDIT_REQUEST, editBudget),
    takeLatest(BudgetTypes.DELETE_REQUEST, deleteBudget),

    takeLatest(CashierTypes.UNSUBSCRIBE_EVENTS, unsubscribeCashierEvents),
    takeLatest(CashierTypes.CREATE_REQUEST, createCashier),
    takeLatest(CashierTypes.EDIT_REQUEST, editCashier),

    takeLatest(CustomerDebitsTypes.GET_DEBITS_REQUEST, getCustomerDebits),
    takeLatest(CustomerDebitsTypes.REMOVE_DEBITS_REQUEST, removeDebit),

    takeLatest(BrandTypes.GET_ALL_REQUEST, getAllBrands),
  ]);
}
