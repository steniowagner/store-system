// @flow

import React, { Fragment } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as ApplicationRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import './config/reactotron';
import './styles/global';

import NavigationMenu from './components/navigation-menu';
import AppTheme from './styles';
import Router from './Router';
import store from './store';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.containerColor};
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
              <NavigationMenu />
              <Router />
            </Fragment>
          </ApplicationRouter>
        </Provider>
      </Wrapper>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default Root;
