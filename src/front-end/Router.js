// @flow

import React from 'react';

import { Route } from 'react-router-dom';
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
  padding: 150px 28px 28px 28px;
  overflow-y: scroll;
`;

const ApplicationRouter = (): Object => (
  <Container>
    <Route
      component={Cashier}
      path="/cashier"
    />
    <Route
      component={Product}
      path="/product"
    />
    <Route
      component={Budget}
      path="/budget"
    />
    <Route
      component={Customer}
      path="/customer"
    />
    <Route
      component={User}
      path="/user"
    />
    <Route
      component={Provider}
      path="/provider"
    />
    <Route
      component={Stock}
      path="/stock"
    />
    <Route
      component={Sales}
      path="/sale"
    />
  </Container>
);

export default ApplicationRouter;
