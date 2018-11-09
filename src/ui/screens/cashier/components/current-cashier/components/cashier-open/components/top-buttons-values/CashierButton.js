// @flow

import React from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import Money from '@material-ui/icons/Money';
import Badge from '@material-ui/core/Badge';

import styled from 'styled-components';

const ItemWrapper = styled.div`
  margin-right: 64px;
`;

const ButtonContainer = styled(ButtonBase)``;

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-radius: 6px;
  background-color: ${({ theme, color }) => theme.colors[color]}};
`;

const ButtonTitle = styled.p`
  margin-right: 18px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const MoneyIcon = styled(({ ...props }) => (
  <Money
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

type ButtonProps = {
  action: Function,
  Icon: Function,
  color: string,
  label: string,
};

const CashierButton = ({
  action,
  color,
  label,
  Icon,
}: ButtonProps): Object => (
  <ItemWrapper>
    <ButtonContainer
      onClick={action}
    >
      <ButtonWrapper
        color={color}
      >
        <ButtonTitle>
          {label}
        </ButtonTitle>
        <Badge
          badgeContent={<Icon />}
          color="primary"
        >
          <MoneyIcon />
        </Badge>
      </ButtonWrapper>
    </ButtonContainer>
  </ItemWrapper>
);

export default CashierButton;
