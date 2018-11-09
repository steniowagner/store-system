// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { BUTTON_TYPES, getButtonConfig } from './button-config';
import { DIALOG_TYPES, getDialogConfig } from './dialog-config';

import MoneyOperationDialog from './MoneyOperationDialog';
import CashierButton from './CashierButton';

const Container = styled.div`
  display: flex;
  margin-bottom: 32px;
`;

type Props = {
  onCloseCashier: Function,
  onTakeMoneyOut: Function,
  onAddMoney: Function,
};

type State = {
  isDialogOpen: boolean,
};

class TopActionButtons extends Component<Props, State> {
  state = {
    moneyOperationDialogConfig: {},
    isDialogOpen: false,
  };

  onToggleMoneyDialog = (): void => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    });
  };

  onClickAddMoney = (): void => {
    const dialogConfig = getDialogConfig(DIALOG_TYPES.ADD_MONEY);

    this.setState({
      moneyOperationDialogConfig: dialogConfig,
      isDialogOpen: true,
    });
  };

  renderAddMoneyButton = (): Object => {
    const config = getButtonConfig(BUTTON_TYPES.ADD_MONEY, this.onClickAddMoney);

    return (
      <CashierButton
        {...config}
      />
    );
  };

  renderTakeMoneyOutButton = (): Object => {
    const { onTakeMoneyOut } = this.props;

    const config = getButtonConfig(BUTTON_TYPES.TAKE_MONEY_OUT, onTakeMoneyOut);

    return (
      <CashierButton
        {...config}
      />
    );
  };

  renderCloseCashierButton = (): Object => {
    const { onCloseCashier } = this.props;

    const config = getButtonConfig(BUTTON_TYPES.CLOSE_CASHIER, onCloseCashier);

    return (
      <CashierButton
        {...config}
      />
    );
  };

  renderMoneyOperationDialog = (): Object => {
    const { moneyOperationDialogConfig, isDialogOpen } = this.state;

    return (
      <MoneyOperationDialog
        {...moneyOperationDialogConfig}
        onToggleMoneyDialog={this.onToggleMoneyDialog}
        isOpen={isDialogOpen}
      />
    );
  };

  render() {
    return (
      <Container>
        {this.renderAddMoneyButton()}
        {this.renderTakeMoneyOutButton()}
        {this.renderCloseCashierButton()}
        {this.renderMoneyOperationDialog()}
      </Container>
    );
  }
}

export default TopActionButtons;
