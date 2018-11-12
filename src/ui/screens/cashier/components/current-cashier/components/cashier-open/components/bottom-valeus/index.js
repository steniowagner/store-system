// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { calculateTotalInputMoney, calculateTotalCashierOperationValue, calculateTotalProfit } from './calculate-bottom-values';
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

const renderTotalInputCashier = (addMoneyOperations: Array<Object>, salesOperations: Array<Object>): Object => {
  const totalInput = calculateTotalInputMoney(addMoneyOperations, salesOperations);
  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_INPUT, totalInput);

  return (
    <BottomItemValue
      {...config}
    />
  );
};

const renderTotalOutputCashier = (takeAwayMoneyOperations: Array<Object>): Object => {
  const totalOutput = calculateTotalCashierOperationValue(takeAwayMoneyOperations);

  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_OUTPUT, totalOutput);

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

const renderProfit = (salesOperations: Array<Object>): Object => {
  const totalProfit = calculateTotalProfit(salesOperations);

  const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_PROFIT, totalProfit);

  return (
    <BottomItemValue
      {...config}
    />
  );
};

type Props = {
  takeAwayMoneyOperations: Array<Object>,
  addMoneyOperations: Array<Object>,
  salesOperations: Array<Object>,
  initialMoneyInCashier: string,
};

const BottomValues = ({
  takeAwayMoneyOperations,
  initialMoneyInCashier,
  addMoneyOperations,
  salesOperations,
}: Props): Object => (
  <Paper>
    <Container>
      <SectionWrapper>
        {renderTotalInputCashier(addMoneyOperations, salesOperations)}
        {renderTotalOutputCashier(takeAwayMoneyOperations)}
      </SectionWrapper>
      <SectionWrapper>
        {renderInitialMoneyInCashier(initialMoneyInCashier)}
        {renderProfit(salesOperations)}
      </SectionWrapper>
    </Container>
  </Paper>
);

export default BottomValues;
