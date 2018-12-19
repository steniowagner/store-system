// @flow

import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import StoreIcon from '@material-ui/icons/Store';

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
  font-size: 18px;
  font-weight: 600;
`;

const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
`;

class HeaderBar extends Component {
  state = {

  };

  render() {
    return (
      <AppBar
        style={{ position: 'fixed' }}
        position="static"
      >
        <Toolbar
          variant="dense"
        >
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
      </AppBar>
    );
  }
}

export default HeaderBar;
