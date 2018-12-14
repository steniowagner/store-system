import { call, put } from 'redux-saga/effects';

import { Creators as CustomerCreators } from '../ducks/customer';
import { Creators as ProviderCreators } from '../ducks/provider';
import { Creators as CashierCreators } from '../ducks/cashier';
import { Creators as ProductCreators } from '../ducks/product';
import { Creators as AlertsCreators } from '../ducks/alerts';
import { Creators as BudgetCreators } from '../ducks/budget';
import { Creators as BackupCreators } from '../ducks/backup';
import { Creators as BrandCreators } from '../ducks/brand';
import { Creators as StockCreators } from '../ducks/stock';
import { Creators as SaleCreators } from '../ducks/sale';
import { Creators as UserCreators } from '../ducks/user';

import { READ_CUSTOMERS, IMPORT_CUSTOMERS } from '../../../back-end/events-handlers/customer/types';
import { READ_PROVIDERS, IMPORT_PROVIDERS } from '../../../back-end/events-handlers/provider/types';
import { READ_PRODUCTS, IMPORT_PRODUCTS } from '../../../back-end/events-handlers/product/types';
import { READ_CASHIERS, IMPORT_CASHIERS } from '../../../back-end/events-handlers/cashier/types';
import { READ_BUDGETS, IMPORT_BUDGET } from '../../../back-end/events-handlers/budget/types';
import { READ_STOCK, IMPORT_STOCK } from '../../../back-end/events-handlers/stock/types';
import { READ_BRANDS, IMPORT_BRANDS } from '../../../back-end/events-handlers/brand/types';
import { READ_SALES, IMPORT_SALES } from '../../../back-end/events-handlers/sale/types';
import { READ_USERS, IMPORT_USERS } from '../../../back-end/events-handlers/user/types';

import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';

import {
  OPERATION_REQUEST,
  CUSTOMER,
  PROVIDER,
  PRODUCT,
  CASHIER,
  BUDGET,
  BRAND,
  STOCK,
  USER,
  SALE,
} from '../../../common/entitiesTypes';

const { ipcRenderer, remote } = window.require('electron');
const { dialog } = remote;

const fs = window.require('fs');

const IMPORT_FILE_TAGS = {
  IMPORT_CUSTOMERS: 'IMPORT_CUSTOMERS',
  IMPORT_PROVIDERS: 'IMPORT_PROVIDERS',
  IMPORT_PRODUCTS: 'IMPORT_PRODUCTS',
  IMPORT_CASHIERS: 'IMPORT_CASHIERS',
  IMPORT_BUDGETS: 'IMPORT_BUDGETS',
  IMPORT_BRANDS: 'IMPORT_BRANDS',
  IMPORT_USERS: 'IMPORT_USERS',
  IMPORT_SALES: 'IMPORT_SALES',
  IMPORT_STOCK: 'IMPORT_STOCK',
};

const BACKUP_TAGS = {
  READ_CUSTOMERS: 'BACKUP_READ_CUSTOMERS',
  READ_PRODUCTS: 'BACKUP_READ_PRODUCTS',
  READ_CASHIERS: 'BACKUP_READ_CASHIERS',
  READ_BUDGETS: 'BACKUP_READ_BUDGETS',
  READ_BRANDS: 'BACKUP_READ_BRANDS',
  READ_PROVIDERS: 'READ_PROVIDERS',
  READ_SALES: 'READ_SALES',
  READ_STOCK: 'READ_STOCK',
  READ_USERS: 'READ_USERS',
};

function* execRequest(entity, action, tag, args) {
  ipcRenderer.send(OPERATION_REQUEST, entity, action, tag, args);
  const { result } = yield handleEventSubscription(tag);
  handleEventUnsubscription(tag);

  return result;
}

const saveFile = (backupFile) => {
  dialog.showSaveDialog((fileName) => {
    if (!fileName) {
      return;
    }

    fs.writeFile(fileName, JSON.stringify({ backupFile }), err => console.log(err));
  });
};

const importFile = () => {
  const readFilehandler = new Promise((resolve, reject) => {
    dialog.showOpenDialog((fileNames) => {
      if (!fileNames) {
        return;
      }

      fs.readFile(fileNames[0], 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  });

  return readFilehandler;
};

export function* startBackup() {
  try {
    const customers = yield call(execRequest, CUSTOMER, READ_CUSTOMERS, BACKUP_TAGS.READ_CUSTOMERS);
    const providers = yield call(execRequest, PROVIDER, READ_PROVIDERS, BACKUP_TAGS.READ_PROVIDERS);
    const cashiers = yield call(execRequest, CASHIER, READ_CASHIERS, BACKUP_TAGS.READ_CASHIERS);
    const products = yield call(execRequest, PRODUCT, READ_PRODUCTS, BACKUP_TAGS.READ_BRANDS);
    const budgets = yield call(execRequest, BUDGET, READ_BUDGETS, BACKUP_TAGS.READ_BUDGETS);
    const brands = yield call(execRequest, BRAND, READ_BRANDS, BACKUP_TAGS.READ_BRANDS);
    const stock = yield call(execRequest, STOCK, READ_STOCK, BACKUP_TAGS.READ_STOCK);
    const sales = yield call(execRequest, SALE, READ_SALES, BACKUP_TAGS.READ_SALES);
    const users = yield call(execRequest, USER, READ_USERS, BACKUP_TAGS.READ_USERS);

    const backupFile = {
      customers,
      providers,
      cashiers,
      products,
      budgets,
      brands,
      stock,
      sales,
      users,
    };

    saveFile(backupFile);
  } catch (err) {
    yield put(BackupCreators.backupFailure());
  }
}

function* updateStore() {
  yield put(BrandCreators.getAllBrands());
  yield put(ProductCreators.getAllProducts());
  yield put(StockCreators.getStock());
  yield put(CustomerCreators.getAllCustomers());
  yield put(ProviderCreators.getAllProviders());
  yield put(CashierCreators.getAllCashiers());
  yield put(SaleCreators.getAllSales());
  yield put(UserCreators.getAllUsers());
  yield put(BudgetCreators.readAllBudgets());
  yield put(AlertsCreators.getNumberBudgetsOutOfDate());
  yield put(AlertsCreators.getNumberCustomersInDebit());
  yield put(AlertsCreators.getNumberStockUnderMin());
}

export function* importBackupFile() {
  try {
    const result = yield importFile();

    const { backupFile } = JSON.parse(result);

    yield call(execRequest, BRAND, IMPORT_BRANDS, IMPORT_FILE_TAGS.IMPORT_BRANDS, backupFile.brands);
    yield call(execRequest, PRODUCT, IMPORT_PRODUCTS, IMPORT_FILE_TAGS.IMPORT_PRODUCTS, backupFile.products);
    yield call(execRequest, STOCK, IMPORT_STOCK, IMPORT_FILE_TAGS.IMPORT_STOCK, backupFile.stock);
    yield call(execRequest, CUSTOMER, IMPORT_CUSTOMERS, IMPORT_FILE_TAGS.IMPORT_CUSTOMERS, backupFile.customers);
    yield call(execRequest, PROVIDER, IMPORT_PROVIDERS, IMPORT_FILE_TAGS.IMPORT_PROVIDERS, backupFile.providers);
    yield call(execRequest, CASHIER, IMPORT_CASHIERS, IMPORT_FILE_TAGS.IMPORT_CASHIERS, backupFile.cashiers);
    yield call(execRequest, SALE, IMPORT_SALES, IMPORT_FILE_TAGS.IMPORT_SALES, backupFile.sales);
    yield call(execRequest, USER, IMPORT_USERS, IMPORT_FILE_TAGS.IMPORT_USERS, backupFile.users);
    yield call(execRequest, BUDGET, IMPORT_BUDGET, IMPORT_FILE_TAGS.IMPORT_BUDGETS, backupFile.budgets);

    yield call(updateStore);
  } catch (err) {
    yield put(BackupCreators.importBackupFileFailure());
  }
}
