// @flow

import { OPERATION_RESPONSE } from '../../../common/entitiesTypes';

const { ipcRenderer } = window.require('electron');

const handleEventResponse = (entity: string): object => {
  const handler = new Promise((resolve) => {
    const eventResponseId = `${OPERATION_RESPONSE}_${entity}`;

    ipcRenderer.on(eventResponseId, (_, result) => {
      resolve({ result });
    });
  });

  return handler;
};

export default handleEventResponse;
