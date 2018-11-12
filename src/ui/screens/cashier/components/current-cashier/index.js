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

  onCloseCashier = (): Object => {
    this.setState({
      initialMoneyInCashier: '',
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
        onCloseCashier={this.onCloseCashier}
      />
    );
  };

  render() {
    const { initialMoneyInCashier } = this.state;

    return (
      <Fragment>
        {initialMoneyInCashier ? this.renderCashierOpen() : this.renderCashierClosed()}
      </Fragment>
    );
  }
}

export default CurrentCashier;
