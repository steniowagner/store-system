// @flow

import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import './config/reactotron';
import './styles/global';

import Root from './components/Root';

import AppTheme from './styles';
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

const App = (): Object => (
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
          <Root />
        </Provider>
      </Wrapper>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default App;
