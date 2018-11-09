// @flow

import React, { Component, Fragment } from 'react';

import CashierClosed from './components/cashier-closed';
import CashierOpen from './components/cashier-open';

class CurrentCashier extends Component {
  state = {
    initialMoneyInCashier: '',
  };

  onSetInitialMoneyInCashier = (initialMoneyInCashier: string): void => {
    this.setState({
      initialMoneyInCashier,
    });
  };

  renderCashierClosed = (): Object => {
    const { initialMoneyInCashier } = this.state;

    return (
      <CashierClosed
        onSetInitialMoneyInCashier={this.onSetInitialMoneyInCashier}
        initialMoneyInCashier={initialMoneyInCashier}
      />
    );
  };

  renderCashierOpen = (): Object => {
    const { initialMoneyInCashier } = this.state;

    return (
      <CashierOpen
        initialMoneyInCashier={initialMoneyInCashier}
      />
    );
  };

  render() {
    return (
      <Fragment>
        {/* this.renderCashierClosed() */}
        {this.renderCashierOpen()}
      </Fragment>
    );
  }
}

export default CurrentCashier;
