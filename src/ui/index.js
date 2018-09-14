import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Sidebar from './components/Sidebar';
import Router from './Router';

import AppTheme from './styles';
import './styles/global';

const Wrapper = styled.div``;

const Root = (): Object => (
  <ThemeProvider
    theme={AppTheme}
  >
    <Wrapper>
      <Sidebar />
      <Router />
    </Wrapper>
  </ThemeProvider>
);

export default Root;
