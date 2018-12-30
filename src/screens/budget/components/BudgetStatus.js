// @flow

import React from 'react';

import Approved from '@material-ui/icons/CheckCircleOutline';
import OutOfTime from '@material-ui/icons/TimerOff';
import Pending from '@material-ui/icons/History';

import styled from 'styled-components';
import appStyles from '../../../styles';

const Wrapper = styled.div`
  margin-left: 24px;
`;

const SelectorWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  border-radius: 6px;
  background-color: ${({ color }) => color};
`;

const ItemSelectedText = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.white};
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const ApprovedIcon = styled(({ ...props }) => (
  <Approved
    {...props}
  />
))`
  padding-bottom: 2px;
  color: ${({ theme }) => theme.colors.white};
`;

const OutOfTimeIcon = styled(({ ...props }) => (
  <OutOfTime
    {...props}
  />
))`
  padding-bottom: 2px;
  color: ${({ theme }) => theme.colors.white};
`;

const PendingIcon = styled(({ ...props }) => (
  <Pending
    {...props}
  />
))`
  padding-bottom: 2px;
  color: ${({ theme }) => theme.colors.white};
`;

export const BUDGET_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  OUT_OF_TIME: 'OUT OF TIME',
};

const STATUS_TYPES = [{
  color: appStyles.colors.warning,
  statusText: BUDGET_STATUS.PENDING,
  Icon: PendingIcon,
}, {
  color: appStyles.colors.success,
  statusText: BUDGET_STATUS.APPROVED,
  Icon: ApprovedIcon,
}, {
  color: appStyles.colors.mediumGray,
  statusText: BUDGET_STATUS.OUT_OF_TIME,
  Icon: OutOfTimeIcon,
}];

type Props = {
  status: string,
};

const getStatusConfig = (status: string): Object => STATUS_TYPES.filter(statusType => statusType.statusText === status)[0];

const BudgetStatus = ({ status }: Props): Object => {
  const currentStatus = status || BUDGET_STATUS.PENDING;

  const { Icon, color, statusText } = getStatusConfig(currentStatus);

  return (
    <Wrapper>
      <span>
        Status
      </span>
      <SelectorWrapper
        color={color}
      >
        <ItemWrapper>
          <ItemSelectedText>
            {statusText}
          </ItemSelectedText>
          <Icon />
        </ItemWrapper>
      </SelectorWrapper>
    </Wrapper>
  );
};

export default BudgetStatus;
