// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { CASHIER_OPERATIONS, getDialogConfig } from './dialog-config';
import { BUTTON_TYPES, getButtonConfig } from './button-config';

import MoneyOperationDialog from '../../../../../MoneyOperationDialog';
import CashierButton from './CashierButton';

const Container = styled.div`
  display: flex;
  margin-bottom: 32px;
`;

type Props = {
  restartContextOperationItem: Function,
  onClickCloseCashierButton: Function,
  onTakeAwaytMoneyCashier: Function,
  onAddMoneyCashier: Function,
  onEditItem: Function,
  operationItem: Object,
};

type State = {
  isDialogOpen: boolean,
};

class TopActionButtons extends Component<Props, State> {
  state = {
    moneyOperationDialogConfig: null,
    isDialogOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    const { operationItem } = nextProps;

    if (!operationItem) {
      return;
    }

    const { type, mode } = operationItem;

    const dialogConfig = getDialogConfig(type);

    if (mode === 'detail') {
      this.handleDetailOperation(operationItem, dialogConfig);
    }

    if (mode === 'edit') {
      this.handleEditOperation(operationItem, dialogConfig);
    }
  }

  onToggleMoneyDialog = (): void => {
    const { restartContextOperationItem } = this.props;
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    }, () => restartContextOperationItem());
  };

  onClickAddMoneyButton = (): void => {
    const { onAddMoneyCashier } = this.props;

    const dialogConfig = getDialogConfig(CASHIER_OPERATIONS.ADD_MONEY, onAddMoneyCashier);

    this.setState({
      moneyOperationDialogConfig: { ...dialogConfig, mode: 'create' },
      isDialogOpen: true,
    });
  };

  onClickTakeAwayMoneyButton = (): void => {
    const { onTakeAwaytMoneyCashier } = this.props;

    const dialogConfig = getDialogConfig(CASHIER_OPERATIONS.TAKE_AWAY_MONEY, onTakeAwaytMoneyCashier);

    this.setState({
      moneyOperationDialogConfig: { ...dialogConfig, mode: 'create' },
      isDialogOpen: true,
    });
  };

  handleEditOperation = (operationDetail: Object, dialogConfig: Object): void => {
    const { reason, value, mode } = operationDetail;
    const { onEditItem } = this.props;

    const onClickOkButtonWhenEditMode = (moneyInputValue: string, reasonInputValue: string): void => {
      this.onToggleMoneyDialog();
      onEditItem(moneyInputValue, reasonInputValue);
    };

    const moneyOperationDialogConfig = {
      ...dialogConfig,
      action: onClickOkButtonWhenEditMode,
      reason,
      value,
      mode,
    };

    this.setState({
      moneyOperationDialogConfig,
      isDialogOpen: true,
    });
  };

  handleDetailOperation = (operationDetail: Object, dialogConfig: Object): void => {
    const { reason, value, mode } = operationDetail;

    const moneyOperationDialogConfig = {
      ...dialogConfig,
      action: this.onToggleMoneyDialog,
      isDisabled: true,
      reason,
      value,
      mode,
    };

    this.setState({
      moneyOperationDialogConfig,
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
    const { onClickCloseCashierButton } = this.props;

    const config = getButtonConfig(BUTTON_TYPES.CLOSE_CASHIER, onClickCloseCashierButton);

    return (
      <CashierButton
        {...config}
      />
    );
  };

  renderMoneyOperationDialog = (): Object => {
    const { moneyOperationDialogConfig, isDialogOpen } = this.state;

    return moneyOperationDialogConfig && (
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
