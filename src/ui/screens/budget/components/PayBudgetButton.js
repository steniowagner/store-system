// @flow

import React from 'react';

import styled from 'styled-components';

import ActionButton from '../../../components/common/ActionButton';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

type Props = {
  onToggleSaleConfirmationDialog: Function,
};

const PayBudgetButton = ({ onToggleSaleConfirmationDialog }: Props): Object => (
  <Wrapper>
    <ActionButton
      action={onToggleSaleConfirmationDialog}
      title="Consolidar Pagamento"
    />
  </Wrapper>
);

export default PayBudgetButton;
