// @flow

import React from 'react';

import styled from 'styled-components';

import Remove from '@material-ui/icons/RemoveCircleOutline';
import Clear from '@material-ui/icons/HighlightOffOutlined';
import Add from '@material-ui/icons/AddCircleOutline';

const AddIcon = styled(({ ...props }) => (
  <Add
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const TakeMoneyOutIcon = styled(({ ...props }) => (
  <Remove
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const CloseCashierIcon = styled(({ ...props }) => (
  <Clear
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

export const BUTTON_TYPES = {
  ADD_MONEY: 'ADD_MONEY',
  TAKE_MONEY_OUT: 'TAKE_MONEY_OUT',
  CLOSE_CASHIER: 'CLOSE_CASHIER',
};

export const getButtonConfig = (type: string, action: Function): Object => {
  const CONFIGS = {
    [BUTTON_TYPES.ADD_MONEY]: {
      color: 'success',
      label: 'INSERT MONEY',
      Icon: AddIcon,
      action,
    },

    [BUTTON_TYPES.TAKE_MONEY_OUT]: {
      color: 'danger',
      label: 'WITHDRAW MONEY',
      Icon: TakeMoneyOutIcon,
      action,
    },

    [BUTTON_TYPES.CLOSE_CASHIER]: {
      color: 'warning',
      label: 'CLOSE CASHIER',
      Icon: CloseCashierIcon,
      action,
    },
  };

  return CONFIGS[type];
};
