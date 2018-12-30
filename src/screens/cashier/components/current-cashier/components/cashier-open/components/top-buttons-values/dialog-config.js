// @flow

export const CASHIER_OPERATIONS = {
  CONSOLIDATE_BUDGET_PAYMENT: 'Budget Payment',
  TAKE_AWAY_MONEY: 'Withdraw',
  ADD_MONEY: 'Insert',
  SALE: 'Sale',
};

export const getDialogConfig = (type: string, action: Function, isDisabled = false): Object => {
  const CONFIGS = {
    [CASHIER_OPERATIONS.ADD_MONEY]: {
      type: CASHIER_OPERATIONS.ADD_MONEY,
      title: {
        create: 'Insert Money',
        edit: 'Edit Money Inserted',
        detail: 'Cashier Entry',
      },
      valueTitle: {
        create: 'Report the amount that will be insert',
        edit: 'Edit Amount inserted',
        detail: 'Amount inserted',
      },
      reasonTitle: {
        create: 'Report the reason of why this amount is been inserted',
        edit: 'Edit the reason of why the amount was inserted',
        detail: 'Reason',
      },
      isDisabled,
      action,
    },

    [CASHIER_OPERATIONS.TAKE_AWAY_MONEY]: {
      type: CASHIER_OPERATIONS.TAKE_AWAY_MONEY,
      title: {
        create: 'Withdraw Money',
        edit: 'Edit Withdrawn Money',
        detail: 'Withdrawn Money',
      },
      valueTitle: {
        create: 'Report the amount that will be withdrawn',
        edit: 'Edit the amount withdrawn',
        detail: 'Withdrawn Money',
      },
      reasonTitle: {
        create: 'Report the reason of why this amount was withdrawn',
        edit: 'Edit the reason of why this amount was withdrawn',
        detail: 'Reason',
      },
      isDisabled,
      action,
    },
  };

  return CONFIGS[type];
};
