import React from 'react';
import { Route } from 'react-router-dom';

import ContainerWrapper from './components/common/ContainerWrapper';

import Customer from './screens/customer';
import Provider from './screens/provider';
import Product from './screens/product';
import Budget from './screens/budget';
import Sales from './screens/sales';
import Stock from './screens/stock';
import User from './screens/user';

const ApplicationRouter = (): Object => (
  <ContainerWrapper>
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
  </ContainerWrapper>
);

export default ApplicationRouter;
