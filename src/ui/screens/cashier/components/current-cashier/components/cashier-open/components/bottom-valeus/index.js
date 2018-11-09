// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { CONFIGS_TYPES, getBottomValueItemConfig } from './item-config';
import BottomItemValue from './BottomItemValue';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.lightGray}
`;

const SectionWrapper = styled.div`
  margin: 8px 16px;
`;

const renderTotalInputCashier = (totalInput: string): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_INPUT, totalInput);

  return (
    <BottomItemValue
      {...config}
    />
  );
};

const renderTotalOutputCashier = (currentOutput: string): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_OUTPUT, currentOutput);

  return (
    <BottomItemValue
      {...config}
    />
  );
};

const renderInitialMoneyInCashier = (initalMoney: string): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.INITAL_MONEY, initalMoney);

  return (
    <BottomItemValue
      {...config}
    />
  );
};

const renderProfit = (currentProfit: string): Object => {
  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_PROFIT, currentProfit);

  return (
    <BottomItemValue
      {...config}
    />
  );
};

type Props = {
  initialMoneyInCashier: string,
  totalOutputCashier: string,
  totalInputCashier: string,
};

const BottomValues = ({
  initialMoneyInCashier,
  totalOutputCashier,
  totalInputCashier,
}: Props): Object => (
  <Paper>
    <Container>
      <SectionWrapper>
        {renderTotalInputCashier(totalInputCashier)}
        {renderTotalOutputCashier(totalOutputCashier)}
      </SectionWrapper>
      <SectionWrapper>
        {renderInitialMoneyInCashier(initialMoneyInCashier)}
        {renderProfit("222")}
      </SectionWrapper>
    </Container>
  </Paper>
);

export default BottomValues;
