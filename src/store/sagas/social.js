
import { OPEN_URL } from './entitiesTypes';

const { ipcRenderer } = window.require('electron');

export const openURL = ({ payload }) => {
  const { url } = payload;

  ipcRenderer.send(OPEN_URL, url);
};
