// @flow

import React, { Component, Fragment } from 'react';

import CloseCashierDialog from './components/CloseCashierDialog';
import TopActionButtons from './components/top-buttons-values';
import BottomValues from '../../../bottom-valeus';
import SaleForm from './components/SaleFormHandler';

import { CASHIER_OPERATIONS } from './components/top-buttons-values/dialog-config';
import Table from '../../../../../../components/common/table';
import config from './config';

import { getNewCashierOperationData } from '../../../../cashier-utils';

type Props = {
  onEditInOutCashierOperation: Function,
  onTakeMoneyFromCashier: Function,
  onAddMoneyIntoCashier: Function,
  onCloseCashier: Function,
  currentCashier: Object,
  initialMoneyInCashier: string,
};

type State = {
  totalInputCashier: string,
  totalOutputCashier: string,
  totalProfit: string,
};

class CashierOpen extends Component<Props, State> {
  state = {
    contextOperationItem: undefined,
    isCloseCashierDialogOpen: false,
    currentTablePage: 0,
  };

  onAddMoneyCashier = (value: string, reason: string): void => {
    const { onAddMoneyIntoCashier } = this.props;

    const addMoneyCashierOperation = getNewCashierOperationData(value, reason, CASHIER_OPERATIONS.ADD_MONEY);

    onAddMoneyIntoCashier(addMoneyCashierOperation);
  };

  onTakeAwaytMoneyCashier = (value: string, reason: string): void => {
    const { onTakeMoneyFromCashier } = this.props;

    const takeAwaytMoneyCashierOperation = getNewCashierOperationData(value, reason, CASHIER_OPERATIONS.TAKE_AWAY_MONEY);

    onTakeMoneyFromCashier(takeAwaytMoneyCashierOperation);
  };

  onEditCashierOperation = (valueEdited: string, reasonEdited: string): void => {
    const { onEditInOutCashierOperation } = this.props;
    const { contextOperationItem } = this.state;

    this.setState({
      contextOperationItem: undefined,
    }, () => onEditInOutCashierOperation(contextOperationItem, valueEdited, reasonEdited));
  };

  onFinishCashier = (): void => {
    const { onCloseCashier } = this.props;

    this.setState({
      isCloseCashierDialogOpen: false,
    }, () => onCloseCashier());
  };

  onEditSaleOperation = (saleEdited: Object): void => {
    this.setState({
      contextOperationItem: undefined,
    });
  };

  onClickTableDetailIcon = (operation: Object): void => {
    this.setState({
      contextOperationItem: { ...operation, mode: 'detail' },
    });
  };

  onClickTableEditIcon = (operation: Object): void => {
    this.setState({
      contextOperationItem: { ...operation, mode: 'edit' },
    });
  };

  onTablePageChange = (currentTablePage: number): void => {
    this.setState({
      currentTablePage,
    });
  };

  onToggleCloseCashierDialog = (): void => {
    const { isCloseCashierDialogOpen } = this.state;

    this.setState({
      isCloseCashierDialogOpen: !isCloseCashierDialogOpen,
    });
  };

  resetItemSelected = (): void => {
    this.setState({
      contextOperationItem: undefined,
    });
  };

  renderTopActioButtons = (): Object => {
    const { contextOperationItem } = this.state;

    const operationItem = (contextOperationItem && (
      contextOperationItem.type === CASHIER_OPERATIONS.SALE ? undefined : contextOperationItem
    ));

    return (
      <TopActionButtons
        onClickCloseCashierButton={this.onToggleCloseCashierDialog}
        onTakeAwaytMoneyCashier={this.onTakeAwaytMoneyCashier}
        onAddMoneyCashier={this.onAddMoneyCashier}
        onEditItem={this.onEditCashierOperation}
        operationItem={operationItem}
      />
    );
  };

  renderSaleForm = (): Object => {
    const { contextOperationItem } = this.state;

    const isSaleOperation = (contextOperationItem && (contextOperationItem.type === CASHIER_OPERATIONS.SALE
      || contextOperationItem.type === CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT));

    const shouldShowForm = (contextOperationItem && isSaleOperation);

    return (
      <SaleForm
        onEditSaleOperation={this.onEditSaleOperation}
        resetItemSelected={this.resetItemSelected}
        item={contextOperationItem || {}}
        isOpen={shouldShowForm}
      />
    );
  };

  renderTable = (): Object => {
    const { currentTablePage } = this.state;
    const { currentCashier } = this.props;

    return (
      <Table
        onDetailIconClicked={this.onClickTableDetailIcon}
        onEditIconClicked={this.onClickTableEditIcon}
        updatePageIndex={this.onTablePageChange}
        currentPage={currentTablePage}
        tabConfig={config.tabConfig}
        canBeRemoved={false}
        dataset={currentCashier.operations}
        canBeEdited
      />
    );
  };

  renderBottomValues = (): Object => {
    const { currentCashier } = this.props;

    return (
      <BottomValues
        initialMoneyCashier={currentCashier.initialMoneyCashier}
        totalOutputCashier={currentCashier.totalOutcome}
        totalInputCashier={currentCashier.totalIncome}
        totalProfit={currentCashier.totalProfit}
      />
    );
  };

  renderCloseCashierDialog = (): Object => {
    const { initialMoneyInCashier, currentCashier } = this.props;
    const { isCloseCashierDialogOpen } = this.state;

    return (
      <CloseCashierDialog
        onToggleCloseCashierDialog={this.onToggleCloseCashierDialog}
        totalOutputCashier={currentCashier.totalOutcome}
        totalInputCashier={currentCashier.totalIncome}
        initialMoneyInCashier={initialMoneyInCashier}
        totalProfit={currentCashier.totalProfit}
        onFinishCashier={this.onFinishCashier}
        isOpen={isCloseCashierDialogOpen}
      />
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderTopActioButtons()}
        {this.renderTable()}
        {this.renderSaleForm()}
        {this.renderBottomValues()}
        {this.renderCloseCashierDialog()}
      </Fragment>
    );
  }
}

export default CashierOpen;
