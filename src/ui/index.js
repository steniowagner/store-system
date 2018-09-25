import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

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
  background-color: ${({ theme }) => theme.colors.white};
`;

const Root = (): Object => (
  <ThemeProvider
    theme={AppTheme}
  >
    <Wrapper>
      <Sidebar />
      <HeaderBar />
      <Router />
    </Wrapper>
  </ThemeProvider>
);

export default Root;
