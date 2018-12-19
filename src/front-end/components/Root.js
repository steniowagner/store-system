// @flow

import React, { Fragment } from 'react';

import { BrowserRouter as ApplicationRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import NavigationMenu from './navigation-menu';
import HeaderBar from './header-bar';
import Router from '../Router';
import Login from './login';

const renderDashboard = (): Object => (
  <ApplicationRouter>
    <Fragment>
      <HeaderBar />
      <NavigationMenu />
      <Router />
    </Fragment>
  </ApplicationRouter>
);

type Props = {
  auth: Object,
};

const Root = ({ auth }: Props): Object => {
  const { isAuthenticated } = auth;

  return (
    <Fragment>
      {isAuthenticated ? renderDashboard() : <Login />}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Root);
