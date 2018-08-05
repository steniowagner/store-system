import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import AppTheme from '../style';

import User from '../screens/user';
import Sidebar from './Sidebar';

const WrapperContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.appBackground}};
`;

const AppWrapperContainer = () => (
  <ThemeProvider theme={AppTheme}>
    <WrapperContainer>
      <User />
    </WrapperContainer>
  </ThemeProvider>
);

export default AppWrapperContainer;
