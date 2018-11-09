// @flow

export const DIALOG_TYPES = {
  ADD_MONEY: 'ADD_MONEY',
  TAKE_AWAY_MONEY: 'TAKE_AWAY_MONEY',
};

export const getDialogConfig = (type: string, action: Function): Object => {
  const CONFIGS = {
    [DIALOG_TYPES.ADD_MONEY]: {
      title: 'Adicionar Dinheiro',
      moneyText: 'Informe a quantidade que será adicionada ao Caixa',
      reasonText: 'Agora, informe o motivo pelo qual esta quantia está sendo adicionada ao Caixa',
      action,
    },

    [DIALOG_TYPES.TAKE_AWAY_MONEY]: {
      title: 'Retirada de Dinheiro',
      moneyText: 'Informe a quantidade que será retirada do Caixa',
      reasonText: 'Agora, informe o motivo pelo qual esta quantia está sendo retirada do Caixa',
      action,
    },
  };

  return CONFIGS[type];
};
