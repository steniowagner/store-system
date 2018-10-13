import React from 'react';
import { Route } from 'react-router-dom';

import ContainerWrapper from './components/common/ContainerWrapper';

import Product from './screens/product';
import User from './screens/user';

const ApplicationRouter = (): Object => (
  <ContainerWrapper>
    <Route
      component={User}
      path="/user"
    />
    <Route
      component={Product}
      path="/product"
    />
  </ContainerWrapper>
);

export default ApplicationRouter;
