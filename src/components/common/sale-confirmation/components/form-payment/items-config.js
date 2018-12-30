// @flow

import React from 'react';

import CreditCard from '@material-ui/icons/CreditCard';
import DebitCard from '@material-ui/icons/CardMembership';
import Check from '@material-ui/icons/CalendarViewDay';
import Money from '@material-ui/icons/Money';

import styled from 'styled-components';

const MoneyIcon = styled(({ ...props }) => (
  <Money
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const CreditCardIcon = styled(({ ...props }) => (
  <CreditCard
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const CheckIcon = styled(({ ...props }) => (
  <Check
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const DebitCardIcon = styled(({ ...props }) => (
  <DebitCard
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

export const ITEMS_TYPES = {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  CHECK: 'CHECK',
  MONEY: 'MONEY',
};

const getItemConfig = (onType: Function, value: string, id: string): Object => {
  const configs = {
    [ITEMS_TYPES.MONEY]: {
      title: 'Money',
      Icon: MoneyIcon,
      onType,
      value,
      id,
    },

    [ITEMS_TYPES.CREDIT_CARD]: {
      title: 'Credit Card',
      Icon: CreditCardIcon,
      onType,
      value,
      id,
    },

    [ITEMS_TYPES.DEBIT_CARD]: {
      title: 'Debit Card',
      Icon: DebitCardIcon,
      onType,
      value,
      id,
    },

    [ITEMS_TYPES.CHECK]: {
      title: 'Check',
      Icon: CheckIcon,
      onType,
      value,
      id,
    },
  };

  return configs[id];
};

export default getItemConfig;
