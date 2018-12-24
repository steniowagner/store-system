import { handleEventUnsubscription, handleEventSubscription } from './eventHandler';
import { OPERATION_REQUEST } from './entitiesTypes';

const { ipcRenderer } = window.require('electron');

export default function* execRequest(entity, action, tag, args) {
  ipcRenderer.send(OPERATION_REQUEST, entity, action, tag, args);
  const { result } = yield handleEventSubscription(tag);
  handleEventUnsubscription(tag);

  return result;
}
