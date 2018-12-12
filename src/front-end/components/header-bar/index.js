// @flow

import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloudIcon from '@material-ui/icons/Cloud';
import StoreIcon from '@material-ui/icons/Store';

import styled from 'styled-components';

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
                MY-STORE
              </Title>
            </LeftSideContainer>

            <RightSideContainer>
              <IconButton
                color="inherit"
                aria-label="Icon"
                style={{
                  marginRight: 8,
                }}
              >
                <CloudIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="Icon"
                style={{
                  marginRight: 8,
                }}
              >
                <NotificationsIcon />
              </IconButton>

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
