// @flow

import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import AccountCircle from '@material-ui/icons/AccountCircle';
import StoreIcon from '@material-ui/icons/Store';

import styled from 'styled-components';

import BellAlert from './components/BellAlerts';
import Backup from './components/backup-component';

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

const UsernameText = styled.p`
  color: ${({ theme }) => theme.colors.white};
`;

const UserIcon = styled(AccountCircle)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.white};
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

              <Button>
                <UserIcon />
                <UsernameText>
                  steniowagner
                </UsernameText>
              </Button>
            </RightSideContainer>

          </Container>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderBar;
