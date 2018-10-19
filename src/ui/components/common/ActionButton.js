// @flow

import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import styled from 'styled-components';

const ButtonContainer = styled(ButtonBase)``;

const ButtonWrapper = styled.div`
  height: 50px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 6px;
  background-color: ${({ isDisabled, theme }) => (isDisabled ? theme.colors.lightGray : theme.colors.affirmative)};
`;

const Title = styled.h2`
  margin-right: 18px,
  font-size: 28px;
  font-weight: 700;
  color: #fff;
`;

type Props = {
  disabled: boolean,
  action: Function,
  title: string,
};

const ActionButton = ({ title, action, disabled }: Props): Obejct => (
  <ButtonContainer
    onClick={() => action()}
    disabled={disabled}
  >
    <ButtonWrapper
      isDisabled={disabled}
    >
      <AddCircleOutline
        style={{
          color: '#fff',
          marginRight: 18,
          fontSize: 28,
        }}
      />
      <Title>
        {title.toUpperCase()}
      </Title>
    </ButtonWrapper>
  </ButtonContainer>
);

export default ActionButton;
