// @flow

import React, { Fragment } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as ApplicationRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import './config/reactotron';
import store from './store';

import Sidebar from './components/sidebar/index';
import HeaderBar from './components/HeaderBar';
import Router from './Router';

import AppTheme from './styles';
import './styles/global';

const Wrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const theme = createMuiTheme({
  palette: {
    primary: { main: AppTheme.colors.affirmative },
    secondary: { main: AppTheme.colors.white },
  },
});

const Root = (): Object => (
  <MuiThemeProvider
    theme={theme}
  >
    <ThemeProvider
      theme={AppTheme}
    >
      <Wrapper>
        <Provider
          store={store}
        >
          <ApplicationRouter>
            <Fragment>
              <Sidebar />
              <HeaderBar />
              <Router />
            </Fragment>
          </ApplicationRouter>
        </Provider>
      </Wrapper>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default Root;
