// @flow

import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Store from '@material-ui/icons/Store';
import Toolbar from '@material-ui/core/Toolbar';

import styled from 'styled-components';

import Backup from './components/backup-component';
import BellAlert from './components/BellAlerts';
import UserInfo from './components/UserInfo';

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

const StoreIcon = styled(Store)`
  color: ${({ theme }) => theme.colors.headerText};
`;

const HeaderBar = (): Object => (
  <Toolbar>
    <Container>
      <LeftSideContainer>
        <IconButton
          color="inherit"
          aria-label="Icon"
        >
          <StoreIcon />
        </IconButton>
        <Title>
          EUNICE LIVROS
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
