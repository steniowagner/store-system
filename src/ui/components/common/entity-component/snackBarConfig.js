// @flow

import { STYLES } from '../CustomSnackbar';

export const TYPES = {
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  REMOVE_SUCCESS: 'REMOVE_SUCCESS',
  EDIT_SUCCESSS: 'EDIT_SUCCESSS',
  CREATE_ERROR: 'CREATE_ERROR',
  REMOVE_ERROR: 'REMOVE_ERROR',
  EDIT_ERROR: 'EDIT_ERROR',
};

export const getConfig = (type: string, entity: string): Object => {
  const configs = {
    [TYPES.CREATE_SUCCESS]: {
      type: STYLES.SUCCESS,
      message: `${entity} criado/criada com sucesso.`,
    },

    [TYPES.EDIT_SUCCESSS]: {
      type: STYLES.SUCCESS,
      message: `${entity} atualizado/atualizada com sucesso.`,
    },

    [TYPES.REMOVE_SUCCESS]: {
      type: STYLES.SUCCESS,
      message: `${entity} removido/removida com sucesso.`,
    },

    [TYPES.CREATE_ERROR]: {
      type: STYLES.ERROR,
      message: `Houve um erro ao criar o/a ${entity}.`,
    },

    [TYPES.EDIT_ERROR]: {
      type: STYLES.ERROR,
      message: `Houve um erro ao editar o/a ${entity}.`,
    },

    [TYPES.REMOVE_ERROR]: {
      type: STYLES.ERROR,
      message: `Houve um erro ao remover o/a ${entity}.`,
    },
  };

  return configs[type];
};
