// @flow

export const ERROR_TYPES = {
  BELOW_VALUE: 'BELOW_VALUE',
  ABOVE_VALUE: 'ABOVE_VALUE',
};

const getErrorMessage = (type: string, value: number): Object => {
  const errors = {
    [ERROR_TYPES.BELOW_VALUE]: {
      message: `Faltam R$ ${value.toFixed(2)}`,
    },

    [ERROR_TYPES.ABOVE_VALUE]: {
      message: `Sobrando R$ ${value.toFixed(2)}`,
    },
  };

  return errors[type];
};

export default getErrorMessage;
