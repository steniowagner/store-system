// @flow

import { OPERATION_RESPONSE } from '../../../common/entitiesTypes';

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

export const handleEventUnsubscription = (EVENT_TAGS: Object): void => {
  const tags = Object.entries(EVENT_TAGS);

  tags.forEach(tagItem => ipcRenderer.removeAllListeners(`${OPERATION_RESPONSE}_${tagItem[1]}`));
};
