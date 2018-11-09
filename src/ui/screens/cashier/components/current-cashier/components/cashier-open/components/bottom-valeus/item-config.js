// @flow

import React from 'react';

import ArrowForward from '@material-ui/icons/ArrowForward';
import InitialMoney from '@material-ui/icons/LocalAtm';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Money from '@material-ui/icons/AttachMoney';

import styled from 'styled-components';

const ArrowBackIcon = styled(({ ...props }) => (
  <ArrowBack
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const ArrowForwardIcon = styled(({ ...props }) => (
  <ArrowForward
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const MoneyIcon = styled(({ ...props }) => (
  <Money
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const InitialMoneyIcon = styled(({ ...props }) => (
  <InitialMoney
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

export const CONFIGS_TYPES = {
  TOTAL_INPUT: 'TOTAL_INPUT',
  TOTAL_OUTPUT: 'TOTAL_OUTPUT',
  TOTAL_PROFIT: 'TOTAL_PROFIT',
  INITAL_MONEY: 'INITAL_MONEY',
};

export const getBottomValueItemConfig = (item: string, value: string) => {
  const configs = {
    [CONFIGS_TYPES.TOTAL_INPUT]: {
      message: `Total de Entrada no Caixa: R$ ${Number(value).toFixed(2)}`,
      Icon: ArrowForwardIcon,
      color: 'success',
    },

    [CONFIGS_TYPES.TOTAL_OUTPUT]: {
      message: `Total de Saída do Caixa: R$ ${Number(value).toFixed(2)}`,
      Icon: ArrowBackIcon,
      color: 'danger',
    },

    [CONFIGS_TYPES.TOTAL_PROFIT]: {
      message: `Lucro Atual: R$ ${Number(value).toFixed(2)}`,
      Icon: MoneyIcon,
      color: 'affirmative',
    },

    [CONFIGS_TYPES.INITAL_MONEY]: {
      message: `Valor Inicial em Caixa: R$ ${Number(value).toFixed(2)}`,
      Icon: InitialMoneyIcon,
      color: 'warning',
    },
  };

  return configs[item];
};
