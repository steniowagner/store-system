import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

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

import { IMPORT_DATA, EXPORT_DATA } from '../../../back-end/events-handlers/backup/types';
import { BACKUP } from '../../../common/entitiesTypes';
import execRequest from './execRequest';

const { dialog } = window.require('electron').remote;
const fs = window.require('fs');

const EVENT_TAGS = {
  EXPORT_DATA: 'EXPORT_DATA',
  IMPORT_DATA: 'IMPORT_DATA',
};

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

const getPathToWriteFile = () => {
  const pathToWrite = new Promise((resolve) => {
    dialog.showSaveDialog((fileName) => {
      if (!fileName) {
        return;
      }

      resolve(fileName);
    });
  });

  return pathToWrite;
};

const writeFile = (pathToFile, fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathToFile, JSON.stringify({ backupFile: fileContent }), (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

export function* startBackup() {
  try {
    const pathToFile = yield call(getPathToWriteFile);

    yield put(BackupCreators.exportBackupFile());

    const fileContent = yield call(execRequest, BACKUP, EXPORT_DATA, EVENT_TAGS.EXPORT_DATA);

    yield call(writeFile, pathToFile, fileContent);

    yield delay(1500); // To make the thing more realistic, :D

    yield put(BackupCreators.exportBackupSuccess());
  } catch (err) {
    yield put(BackupCreators.exportBackupFailure());
  }
}

const getPathToReadFile = () => {
  const pathToRead = new Promise((resolve) => {
    dialog.showOpenDialog((fileNames) => {
      if (!fileNames) {
        return;
      }

      resolve(fileNames[0]);
    });
  });

  return pathToRead;
};

const readFile = (pathToFile) => {
  const fileContent = new Promise((resolve, reject) => {
    fs.readFile(pathToFile, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });

  return fileContent;
};

export function* importBackupFile() {
  try {
    const pathToFile = yield call(getPathToReadFile);

    yield put(BackupCreators.importBackupFileStart());

    const fileContent = yield call(readFile, pathToFile);
    const { backupFile } = JSON.parse(fileContent);

    yield call(execRequest, BACKUP, IMPORT_DATA, EVENT_TAGS.IMPORT_DATA, backupFile);
    yield call(updateStore);

    yield delay(1500); // To make the thing more realistic, :D
    yield put(BackupCreators.importBackupFileSuccess());
  } catch (err) {
    yield put(BackupCreators.importBackupFileFailure());
  }
}
