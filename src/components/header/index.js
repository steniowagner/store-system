// @flow

import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import NavigationMenu from './components/navigation-menu';
import Toolbar from './components/toolbar';

const Header = (): Object => (
  <AppBar
    style={{ position: 'fixed' }}
    position="static"
    color="secondary"
  >
    <Toolbar />
    <NavigationMenu />
  </AppBar>
);

export default Header;
