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
  onTakeAwaytMoneyCashier: Function,
  onAddMoneyCashier: Function,
  onCloseCashier: Function,
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

  onClickAddMoneyButton = (): void => {
    const { onAddMoneyCashier } = this.props;

    const dialogConfig = getDialogConfig(DIALOG_TYPES.ADD_MONEY, onAddMoneyCashier);

    this.setState({
      moneyOperationDialogConfig: dialogConfig,
      isDialogOpen: true,
    });
  };

  onClickTakeAwayMoneyButton = (): void => {
    const { onTakeAwaytMoneyCashier } = this.props;

    const dialogConfig = getDialogConfig(DIALOG_TYPES.TAKE_AWAY_MONEY, onTakeAwaytMoneyCashier);

    this.setState({
      moneyOperationDialogConfig: dialogConfig,
      isDialogOpen: true,
    });
  };

  renderAddMoneyButton = (): Object => {
    const config = getButtonConfig(BUTTON_TYPES.ADD_MONEY, this.onClickAddMoneyButton);

    return (
      <CashierButton
        {...config}
      />
    );
  };

  renderTakeMoneyOutButton = (): Object => {
    const config = getButtonConfig(BUTTON_TYPES.TAKE_MONEY_OUT, this.onClickTakeAwayMoneyButton);

    return (
      <CashierButton
        {...config}
      />
    );
  };

  renderCloseCashierButton = (): Object => {
    const config = getButtonConfig(BUTTON_TYPES.CLOSE_CASHIER, () => {});

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
