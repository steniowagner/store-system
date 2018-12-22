// @flow

import React, { Component } from 'react';

import { withRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

import Customer from './screens/customer';
import Provider from './screens/provider';
import Product from './screens/product';
import Cashier from './screens/cashier';
import Budget from './screens/budget';
import Sales from './screens/sales';
import Stock from './screens/stock';
import User from './screens/user';

const Container = styled.div`
  height: 100%;
  padding: 164px 28px 28px 28px;
  overflow-y: scroll;
`;

type Props = {
  history: Object,
};

class ApplicationRouter extends Component<Props, {}> {
  componentDidMount() {
    const { history } = this.props;

    history.push('/dashboard/cashier');
  }

  render() {
    return (
      <Container>
        <Route
          component={Cashier}
          path="/dashboard/cashier"
        />
        <Route
          component={Product}
          path="/dashboard/product"
        />
        <Route
          component={Budget}
          path="/dashboard/budget"
        />
        <Route
          component={Customer}
          path="/dashboard/customer"
        />
        <Route
          component={User}
          path="/dashboard/user"
        />
        <Route
          component={Provider}
          path="/dashboard/provider"
        />
        <Route
          component={Stock}
          path="/dashboard/stock"
        />
        <Route
          component={Sales}
          path="/dashboard/sale"
        />
      </Container>
    );
  }
}

export default withRouter(ApplicationRouter);
