// @flow

import React from 'react';

import AssignmentInd from '@material-ui/icons/AssignmentInd';
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

const UserIcon = styled(({ ...props }) => (
  <AssignmentInd
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  dateToShow: string,
  salesman: string,
};

const TopContent = ({ dateToShow, salesman }: Props): Object => (
  <Wrapper>
    <h2>
      {dateToShow}
    </h2>
    <SalerInfoWrapper>
      <UserIconWrapper>
        <UserIcon />
      </UserIconWrapper>
      <SalerText>
        {salesman}
      </SalerText>
    </SalerInfoWrapper>
  </Wrapper>
);

export default TopContent;
