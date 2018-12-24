import { select, put } from 'redux-saga/effects';

import moment from 'moment';
import 'moment/locale/pt-br';

import { OPEN_PRINT_WINDOW, CLOSE_PRINT_WINDOW } from './entitiesTypes';
import { Creators as PrintCreators } from '../ducks/print';

const { ipcRenderer } = window.require('electron');

function* print(fileName) {
  ipcRenderer.send(OPEN_PRINT_WINDOW, fileName);

  yield new Promise((resolve) => {
    ipcRenderer.on(CLOSE_PRINT_WINDOW, () => {
      ipcRenderer.removeAllListeners(CLOSE_PRINT_WINDOW);
      ipcRenderer.removeAllListeners(OPEN_PRINT_WINDOW);
      resolve();
    });
  });
}

const getFilaName = (data, currentPage) => {
  const customerName = ((data.customer.name && data.customer.name.toLowerCase()) || '');
  const type = (data.status ? 'orçamento' : 'venda');
  const date = moment().format('DD-MM-YYYY');
  const page = (currentPage > 0 ? `-(${currentPage})` : '');

  const fileName = `${type}-${customerName}-${date}${page}`;

  return fileName;
};

export function* handlePrint() {
  let shouldPrint = true;

  while (shouldPrint) {
    const { numberOfPages, currentPage, data } = yield select(state => state.print);
    const fileName = getFilaName(data, currentPage);

    yield print(fileName);

    if ((numberOfPages - 1) === currentPage) {
      shouldPrint = false;
    } else {
      yield put(PrintCreators.rePrint());
    }
  }

  yield put(PrintCreators.finishPrint());
}
