// @flow

import React from 'react';

import styled from 'styled-components';

import SelectLimitDate from './SelectLimitDate';
import PayBudgetButton from './PayBudgetButton';
import BudgetStatus from './BudgetStatus';

const Wrapper = styled.div`
  margin: 24px 0;
`;

const LineWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StatusAndPaymentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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
        <StatusAndPaymentWrapper>
          {shouldRenderPayBudgetButton && (
            <PayBudgetButton
              {...props}
            />
          )}
          <BudgetStatus
            {...props}
          />
        </StatusAndPaymentWrapper>
      </LineWrapper>
    </Wrapper>
  );
};

export default BudgetExtraComponent;
