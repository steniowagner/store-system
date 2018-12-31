// @flow

import ArrowForward from '@material-ui/icons/ArrowForward';
import InitialMoney from '@material-ui/icons/LocalAtm';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Money from '@material-ui/icons/AttachMoney';

import styled from 'styled-components';

const ArrowBackIcon = styled(ArrowBack)`
  color: ${({ theme }) => theme.colors.white};
`;

const ArrowForwardIcon = styled(ArrowForward)`
  color: ${({ theme }) => theme.colors.white};
`;

const MoneyIcon = styled(Money)`
  color: ${({ theme }) => theme.colors.white};
`;

const InitialMoneyIcon = styled(InitialMoney)`
  color: ${({ theme }) => theme.colors.white};
`;

export const CONFIGS_TYPES = {
  TOTAL_PROFIT_FINISH_CASHIER: 'TOTAL_PROFIT_FINISH_CASHIER',
  TOTAL_INPUT: 'TOTAL_INPUT',
  TOTAL_OUTPUT: 'TOTAL_OUTPUT',
  TOTAL_PROFIT: 'TOTAL_PROFIT',
  INITAL_MONEY: 'INITAL_MONEY',
};

export const getBottomValueItemConfig = (item: string, value: number): Object => {
  const configs = {
    [CONFIGS_TYPES.TOTAL_INPUT]: {
      message: 'Total Inserted in Cashier:',
      value: `$ ${Number(value).toFixed(2)}`,
      Icon: ArrowForwardIcon,
      color: 'success',
    },

    [CONFIGS_TYPES.TOTAL_OUTPUT]: {
      message: 'Total Withdrawn in Cashier:',
      value: `$ ${Number(value).toFixed(2)}`,
      Icon: ArrowBackIcon,
      color: 'danger',
    },

    [CONFIGS_TYPES.TOTAL_PROFIT]: {
      message: 'Profit:',
      value: `$ ${Number(value).toFixed(2)}`,
      Icon: MoneyIcon,
      color: 'affirmative',
    },

    [CONFIGS_TYPES.TOTAL_PROFIT_FINISH_CASHIER]: {
      message: 'Total Profit:',
      value: `$ ${Number(value).toFixed(2)}`,
      Icon: MoneyIcon,
      color: 'affirmative',
    },

    [CONFIGS_TYPES.INITAL_MONEY]: {
      message: 'Initial Money Quantity in Cashier:',
      value: `$ ${Number(value).toFixed(2)}`,
      Icon: InitialMoneyIcon,
      color: 'warning',
    },
  };

  return configs[item];
};
