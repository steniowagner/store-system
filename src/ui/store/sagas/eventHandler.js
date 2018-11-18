// @flow

import { OPERATION_RESPONSE } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

export const handleEventSubscription = (entity: string): Object => {
  const handler = new Promise((resolve) => {
    const eventResponseId = `${OPERATION_RESPONSE}_${entity}`;

    ipcRenderer.on(eventResponseId, (_, result) => {
      resolve({ result });
    });
  });

  return handler;
};

export const handleEventUnsubscription = (entity: string): void => {
  ipcRenderer.removeAllListeners(`${OPERATION_RESPONSE}_${entity}`);
};
