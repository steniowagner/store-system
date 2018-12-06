// @flow

import React from 'react';

import styled from 'styled-components';

import ActionButton from '../../../../../../../components/common/ActionButton';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BigText = styled.p`
  margin-bottom: 16px;
  font-size: 42px;
  font-weight: 800;
`;

const SmallText = styled.p`
  margin-bottom: 32px;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mediumGrayDisabled};
`;

const ContentWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type Props = {
  onToggleInitialMoneyDialog: Function,
};

const CashierClosedAlert = ({ onToggleInitialMoneyDialog }: Props): Object => (
  <Wrapper>
    <ContentWrapper>
      <BigText>
        Caixa Fechado
      </BigText>
      <SmallText>
        O Caixa encontra-se fechado. Para abrir o Caixa e iniciar as operações, clique no botão abaixo.
      </SmallText>
      <ActionButton
        action={onToggleInitialMoneyDialog}
        title="ABRIR CAIXA"
      />
    </ContentWrapper>
  </Wrapper>
);

export default CashierClosedAlert;
