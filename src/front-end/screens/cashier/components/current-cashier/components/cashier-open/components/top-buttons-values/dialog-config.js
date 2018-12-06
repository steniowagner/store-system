// @flow

export const DIALOG_TYPES = {
  ADD_MONEY: 'Inserção',
  TAKE_AWAY_MONEY: 'Retirada',
  SALE: 'Venda',
};

export const getDialogConfig = (type: string, action: Function, isDisabled = false): Object => {
  const CONFIGS = {
    [DIALOG_TYPES.ADD_MONEY]: {
      type: DIALOG_TYPES.ADD_MONEY,
      title: {
        create: 'Adicionar Dinheiro',
        edit: 'Editar Entrada de Dinheiro',
        detail: 'Entrada no Caixa',
      },
      valueTitle: {
        create: 'Informe a quantidade que será adicionada ao Caixa',
        edit: 'Editar valor adicionada ao Caixa',
        detail: 'Valor Adicionado',
      },
      reasonTitle: {
        create: 'Informe o motivo pelo qual esta quantia está sendo adicionada ao Caixa',
        edit: 'Editar o motivo do valor ter sido adicionada ao Caixa',
        detail: 'Motivo',
      },
      isDisabled,
      action,
    },

    [DIALOG_TYPES.TAKE_AWAY_MONEY]: {
      type: DIALOG_TYPES.TAKE_AWAY_MONEY,
      title: {
        create: 'Retirar Dinheiro',
        edit: 'Editar Retirada de Dinheiro',
        detail: 'Retirada no Caixa',
      },
      valueTitle: {
        create: 'Informe a quantidade que será retirada do Caixa',
        edit: 'Editar valor retirado do Caixa',
        detail: 'Valor Retirado',
      },
      reasonTitle: {
        create: 'Informe o motivo pelo qual esta quantia está sendo retirada do Caixa',
        edit: 'Editar o motivo do valor ter sido retirado do Caixa',
        detail: 'Motivo',
      },
      isDisabled,
      action,
    },
  };

  return CONFIGS[type];
};
