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
  createUser,
  getAllUsers,
  editUser,
  removeUser,
} from './user';

import {
  createCustomer,
  getAllCustomers,
  editCustomer,
  removeCustomer,
} from './customer';

import {
  createProduct,
  getAllProducts,
  editProduct,
  removeProduct,
} from './product';

import {
  createProvider,
  getAllProviders,
  editProvider,
  removeProvider,
} from './provider';

import {
  setOutdatedBudgets,
  confirmBudgetPayment,
  getAllBudgets,
  createBudget,
  editBudget,
  deleteBudget,
} from './budget';

import { editProductInStock, insertProduct, getStock } from './stock';

import { getAllCashiers, createCashier, editCashier } from './cashier';

import { getCustomerDebits, removeDebit } from './customerDebits';

import { getAllSales, createSale, editSale } from './sale';

import { getAllBrands } from './brand';

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.CREATE_REQUEST, createUser),
    takeLatest(UserTypes.GET_ALL_REQUEST, getAllUsers),
    takeLatest(UserTypes.EDIT_REQUEST, editUser),
    takeLatest(UserTypes.REMOVE_REQUEST, removeUser),

    takeLatest(ProviderTypes.CREATE_REQUEST, createProvider),
    takeLatest(ProviderTypes.GET_ALL_REQUEST, getAllProviders),
    takeLatest(ProviderTypes.EDIT_REQUEST, editProvider),
    takeLatest(ProviderTypes.REMOVE_REQUEST, removeProvider),

    takeLatest(CustomerTypes.CREATE_REQUEST, createCustomer),
    takeLatest(CustomerTypes.GET_ALL_REQUEST, getAllCustomers),
    takeLatest(CustomerTypes.EDIT_REQUEST, editCustomer),
    takeLatest(CustomerTypes.REMOVE_REQUEST, removeCustomer),

    takeLatest(ProductTypes.CREATE_REQUEST, createProduct),
    takeLatest(ProductTypes.GET_ALL_REQUEST, getAllProducts),
    takeLatest(ProductTypes.EDIT_REQUEST, editProduct),
    takeLatest(ProductTypes.REMOVE_REQUEST, removeProduct),

    takeLatest(StockTypes.INSERT_REQUEST, insertProduct),
    takeLatest(StockTypes.EDIT_REQUEST, editProductInStock),
    takeLatest(StockTypes.GET_REQUEST, getStock),

    takeLatest(SaleTypes.CREATE_REQUEST, createSale),
    takeLatest(SaleTypes.GET_ALL_REQUEST, getAllSales),
    takeLatest(SaleTypes.EDIT_REQUEST, editSale),

    takeLatest(BudgetTypes.CONFIRM_BUDGET_SALE_REQUEST, confirmBudgetPayment),
    takeLatest(BudgetTypes.SET_OUTDATED_ITEMS_REQUEST, setOutdatedBudgets),
    takeLatest(BudgetTypes.CREATE_REQUEST, createBudget),
    takeLatest(BudgetTypes.READ_ALL_REQUEST, getAllBudgets),
    takeLatest(BudgetTypes.EDIT_REQUEST, editBudget),
    takeLatest(BudgetTypes.DELETE_REQUEST, deleteBudget),

    takeLatest(CashierTypes.READ_ALL_REQUEST, getAllCashiers),
    takeLatest(CashierTypes.CREATE_REQUEST, createCashier),
    takeLatest(CashierTypes.EDIT_REQUEST, editCashier),

    takeLatest(CustomerDebitsTypes.GET_DEBITS_REQUEST, getCustomerDebits),
    takeLatest(CustomerDebitsTypes.REMOVE_DEBITS_REQUEST, removeDebit),

    takeLatest(BrandTypes.GET_ALL_REQUEST, getAllBrands),
  ]);
}
