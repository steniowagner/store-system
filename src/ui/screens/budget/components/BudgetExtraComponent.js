// @flow

import React from 'react';

import styled from 'styled-components';

import SelectLimitDate from './SelectLimitDate';
import PayBudgetButton from './PayBudgetButton';
import BudgetStatus from './BudgetStatus';

const Wrapper = styled.div`
  margin: 16px 0;
`;

const LineWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

type Props = {
  onToggleSaleConfirmationDialog: Function,
  setFieldValue: Function,
  errors: Object,
  values: Object,
  mode: string,
};

const BudgetExtraComponent = (props: Props): Object => {
  const { mode } = props;
  const shouldRenderPayBudgetButton = (mode === 'detail');

  return (
    <Wrapper>
      <LineWrapper>
        <SelectLimitDate
          {...props}
        />
        <BudgetStatus
          {...props}
        />
      </LineWrapper>
      {shouldRenderPayBudgetButton && (
        <PayBudgetButton
          {...props}
        />
      )}
    </Wrapper>
  );
};

export default BudgetExtraComponent;
