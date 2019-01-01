// @flow

import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';

import styled from 'styled-components';

import Backup from './components/backup-component';
import BellAlert from './components/BellAlerts';
import UserInfo from './components/UserInfo';
import AboutMe from './components/about-me';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  margin-left: 16px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.headerText};
`;

const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderBar = (): Object => (
  <Toolbar>
    <Container>
      <LeftSideContainer>
        <AboutMe />
        <Title>
          MY STORE
        </Title>
      </LeftSideContainer>
      <RightSideContainer>
        <Backup />
        <BellAlert />
        <UserInfo />
      </RightSideContainer>
    </Container>
  </Toolbar>
);

export default HeaderBar;
