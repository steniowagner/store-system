// @flow

import React, { Component } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import './styles/fade.css';

import Customer from './screens/customer';
import Provider from './screens/provider';
import Product from './screens/product';
import Cashier from './screens/cashier';
import Budget from './screens/budget';
import Sales from './screens/sales';
import Stock from './screens/stock';
import User from './screens/user';

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  padding: 164px 28px 28px 28px;
`;

const Container = styled.div`
  height: 100%;
  position: relative;
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
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={250}
              >
                <Wrapper>
                  <Switch
                    location={location}
                  >
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
                  </Switch>
                </Wrapper>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Container>
    );
  }
}

export default withRouter(ApplicationRouter);
