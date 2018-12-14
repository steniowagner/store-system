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

import { IMPORT_DATA, EXPORT_DATA } from '../../../back-end/events-handlers/backup/types';
import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST, BACKUP } from '../../../common/entitiesTypes';

const { ipcRenderer, remote } = window.require('electron');
const { dialog } = remote;

const fs = window.require('fs');

const EVENT_TAGS = {
  EXPORT_DATA: 'EXPORT_DATA',
  IMPORT_DATA: 'IMPORT_DATA',
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

export function* startBackup() {
  try {
    const backupFile = yield call(execRequest, BACKUP, EXPORT_DATA, EVENT_TAGS.EXPORT_DATA);
    saveFile(backupFile);
  } catch (err) {
    yield put(BackupCreators.backupFailure());
  }
}

export function* importBackupFile() {
  try {
    const fileContent = yield importFile();

    const { backupFile } = JSON.parse(fileContent);

    yield call(execRequest, BACKUP, IMPORT_DATA, EVENT_TAGS.IMPORT_DATA, backupFile);
    yield call(updateStore);
  } catch (err) {
    yield put(BackupCreators.importBackupFileFailure());
  }
}
