// @flow

import React from 'react';

import AssignmentInd from '@material-ui/icons/AssignmentInd';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 8px;
`;

const SalerText = styled.span`
  font-size: 18px;
  margin-left: 12px;
`;

const SalerInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserIconWrapper = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.affirmative};
`;

const ArrowBackIcon = styled(ArrowBack)`
  color: ${({ theme }) => theme.colors.white};
`;

const UserIcon = styled(({ ...props }) => (
  <AssignmentInd
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  onClickBackButton: Function,
  dateToShow: string,
  salesman: string,
};

const renderBackButton = (onClickBackButton: Function): Object => (
  <Button
    onClick={onClickBackButton}
    aria-label="Close"
    color="primary"
    variant="fab"
  >
    <ArrowBackIcon />
  </Button>
);

const renderSalesmanInfo = (salesman: string): Object => (
  <SalerInfoWrapper>
    <UserIconWrapper>
      <UserIcon />
    </UserIconWrapper>
    <SalerText>
      {salesman}
    </SalerText>
  </SalerInfoWrapper>
);

const TopContent = ({ onClickBackButton, dateToShow, salesman }: Props): Object => (
  <Wrapper>
    {renderBackButton(onClickBackButton)}
    <h2>
      {dateToShow}
    </h2>
    {renderSalesmanInfo(salesman)}
  </Wrapper>
);

export default TopContent;
