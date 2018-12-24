// @flow

import React from 'react';

import ActionButton from '../../../components/common/ActionButton';

type Props = {
  onToggleSaleConfirmationDialog: Function,
};

const PayBudgetButton = ({ onToggleSaleConfirmationDialog }: Props): Object => (
  <ActionButton
    action={onToggleSaleConfirmationDialog}
    title="Consolidar Pagamento"
  />
);

export default PayBudgetButton;
