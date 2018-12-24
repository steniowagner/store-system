// @flow

import { OPERATION_RESPONSE } from './entitiesTypes';

const { ipcRenderer } = window.require('electron');

export const handleEventSubscription = (eventTag: string): Object => {
  const handler = new Promise((resolve) => {
    const eventResponseId = `${OPERATION_RESPONSE}_${eventTag}`;

    ipcRenderer.on(eventResponseId, (_, result) => {
      resolve({ result });
    });
  });

  return handler;
};

export const handleEventUnsubscription = (eventTag: string): void => {
  ipcRenderer.removeAllListeners(`${OPERATION_RESPONSE}_${eventTag}`);
};
