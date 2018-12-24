// @flow

export const CASHIER_OPERATIONS = {
  CONSOLIDATE_BUDGET_PAYMENT: 'Pgto. de Orçamento',
  TAKE_AWAY_MONEY: 'Retirada',
  ADD_MONEY: 'Inserção',
  SALE: 'Venda',
};

export const getDialogConfig = (type: string, action: Function, isDisabled = false): Object => {
  const CONFIGS = {
    [CASHIER_OPERATIONS.ADD_MONEY]: {
      type: CASHIER_OPERATIONS.ADD_MONEY,
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

    [CASHIER_OPERATIONS.TAKE_AWAY_MONEY]: {
      type: CASHIER_OPERATIONS.TAKE_AWAY_MONEY,
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
