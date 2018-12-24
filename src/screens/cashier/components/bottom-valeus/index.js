// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { CONFIGS_TYPES, getBottomValueItemConfig } from './item-config';
import BottomItem from './BottomItem';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightGray}
`;

const SectionWrapper = styled.div`
  margin: 8px 16px;
`;

const renderTotalInputCashier = (totalInputCashier: number): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_INPUT, totalInputCashier);

  return (
    <BottomItem
      {...config}
    />
  );
};

const renderTotalOutputCashier = (totalOutputCashier: number): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_OUTPUT, totalOutputCashier);

  return (
    <BottomItem
      {...config}
    />
  );
};

const renderInitialMoneyInCashier = (initalMoney: number): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.INITAL_MONEY, initalMoney);

  return (
    <BottomItem
      {...config}
    />
  );
};

const renderProfit = (totalProfit: number): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_PROFIT, totalProfit);

  return (
    <BottomItem
      {...config}
    />
  );
};

type Props = {
  initialMoneyCashier: string,
  totalOutputCashier: number,
  totalInputCashier: number,
  totalProfit: number,
};

const BottomValues = ({
  initialMoneyCashier,
  totalOutputCashier,
  totalInputCashier,
  totalProfit,
}: Props): Object => (
  <Paper>
    <Container>
      <SectionWrapper>
        {renderTotalInputCashier(totalInputCashier)}
        {renderTotalOutputCashier(totalOutputCashier)}
      </SectionWrapper>
      <SectionWrapper>
        {renderInitialMoneyInCashier(initialMoneyCashier)}
        {renderProfit(totalProfit)}
      </SectionWrapper>
    </Container>
  </Paper>
);

export default BottomValues;
