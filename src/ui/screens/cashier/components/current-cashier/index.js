// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import InitialMoneyCashDialog from './components/InitialMoneyCashDialog';
import CashierClosedAlert from './components/CashierClosedAlert';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

class CurrentCashier extends Component {
  state = {
    isInitialMoneyDialogOpen: false,
    initialMoney: '',
  };

  onToggleInitialMoneyDialog = (): void => {
    const { isInitialMoneyDialogOpen } = this.state;

    this.setState({
      isInitialMoneyDialogOpen: !isInitialMoneyDialogOpen,
    });
  };

  onTypeInitialMoney = (initialMoney: string): void => {
    this.setState({
      initialMoney,
    });
  };

  renderCashierClosedAlert = (): Object => (
    <CashierClosedAlert
      onToggleInitialMoneyDialog={this.onToggleInitialMoneyDialog}
    />
  );

  renderInitialMoneyCashDialog = (): Object => {
    const { isInitialMoneyDialogOpen, initialMoney } = this.state;

    return (
      <InitialMoneyCashDialog
        onToggleInitialMoneyDialog={this.onToggleInitialMoneyDialog}
        onTypeInitialMoney={this.onTypeInitialMoney}
        isOpen={isInitialMoneyDialogOpen}
        initialMoney={initialMoney}
      />
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderCashierClosedAlert()}
        {this.renderInitialMoneyCashDialog()}
      </Wrapper>
    );
  }
}

export default CurrentCashier;
