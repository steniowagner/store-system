// @flow

export const TYPES = {
  CREATE_SUCCESS: 'createSuccess',
  REMOVE_SUCCESS: 'removeSuccess',
  EDIT_SUCCESSS: 'editSuccess',
  CREATE_ERROR: 'createError',
  REMOVE_ERROR: 'removeError',
  EDIT_ERROR: 'editError',
};

const getConfig = (type: string, entity: string): Object => {
  const configs = {
    [TYPES.CREATE_SUCCESS]: {
      type: 'success',
      message: `${entity} criado com sucesso.`,
    },

    [TYPES.EDIT_SUCCESSS]: {
      type: 'success',
      message: `${entity} atualizado com sucesso.`,
    },

    [TYPES.REMOVE_SUCCESS]: {
      type: 'success',
      message: `${entity} removido com sucesso.`,
    },

    [TYPES.CREATE_ERROR]: {
      type: 'error',
      message: `Houve um erro ao criar o ${entity}.`,
    },

    [TYPES.EDIT_ERROR]: {
      type: 'error',
      message: `Houve um erro ao editar o ${entity}.`,
    },

    [TYPES.REMOVE_ERROR]: {
      type: 'error',
      message: `Houve um erro ao remover o ${entity}.`,
    },
  };

  return configs[type];
};

export default getConfig;
