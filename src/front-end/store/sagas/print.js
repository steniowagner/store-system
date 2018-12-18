import { put } from 'redux-saga/effects';

import { OPEN_PRINT_WINDOW, CLOSE_PRINT_WINDOW } from '../../../common/entitiesTypes';
import { Creators as PrintCreators } from '../ducks/print';

const { ipcRenderer } = window.require('electron');

export function* handlePrint() {
  ipcRenderer.send(OPEN_PRINT_WINDOW, 'fileName');

  yield new Promise((resolve) => {
    ipcRenderer.on(CLOSE_PRINT_WINDOW, () => {
      ipcRenderer.removeAllListeners(CLOSE_PRINT_WINDOW);
      ipcRenderer.removeAllListeners(OPEN_PRINT_WINDOW);
      resolve();
    });
  });

  yield put(PrintCreators.closePrintWindow());
}
