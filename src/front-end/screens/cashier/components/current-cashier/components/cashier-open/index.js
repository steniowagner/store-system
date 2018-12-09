// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import CloseCashierDialog from './components/CloseCashierDialog';
import TopActionButtons from './components/top-buttons-values';
import BottomValues from '../../../bottom-valeus';

import SaleDetailDialog from '../../../../../../components/common/sale-detail-dialog';
import { CASHIER_OPERATIONS } from './components/top-buttons-values/dialog-config';
import Table from '../../../../../../components/common/table';
import config from './config';

import { getNewCashierOperationData } from '../../../../cashier-utils';

const Wrapper = styled.div`
  margin: 0 4px;
`;

type Props = {
  onEditInOutCashierOperation: Function,
  setCurrentCashierTablePage: Function,
  onTakeMoneyFromCashier: Function,
  onAddMoneyIntoCashier: Function,
  setTableItemsPerPage: Function,
  onCloseCashier: Function,
  currentCashier: Object,
  tabInfo: Object,
};

type State = {
  isCloseCashierDialogOpen: boolean,
  contextOperationItem: any,
};

class CashierOpen extends Component<Props, State> {
  state = {
    isCloseCashierDialogOpen: false,
    isSaleDetailDialogOpen: false,
    contextOperationItem: {},
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
      contextOperationItem: {},
    }, () => onEditInOutCashierOperation(contextOperationItem, valueEdited, reasonEdited));
  };

  onFinishCashier = (): void => {
    const { onCloseCashier } = this.props;

    this.setState({
      isCloseCashierDialogOpen: false,
    }, () => onCloseCashier());
  };

  onClickTableDetailIcon = (operation: Object): void => {
    this.setState({
      contextOperationItem: { ...operation, mode: 'detail' },
      isSaleDetailDialogOpen: true,
    });
  };

  onToggleCloseCashierDialog = (): void => {
    const { isCloseCashierDialogOpen } = this.state;

    this.setState({
      isCloseCashierDialogOpen: !isCloseCashierDialogOpen,
      isSaleDetailDialogOpen: false,
    });
  };

  onToggleSaleDetailDialog = (): void => {
    const { isSaleDetailDialogOpen } = this.state;

    this.setState({
      isSaleDetailDialogOpen: !isSaleDetailDialogOpen,
    });
  };

  getPaymentInfoText = (contextOperationItem: Object): string => {
    const { paymentInfo } = contextOperationItem;

    const paidValueText = Object.entries(paymentInfo)
      .reduce((total, value) => total + Number(value[1]), 0);

    return `R$ ${paidValueText.toFixed(2)}`;
  };

  resetItemSelected = (): void => {
    this.setState({
      contextOperationItem: {},
    });
  };

  renderTopActioButtons = (): Object => {
    const { contextOperationItem } = this.state;

    const isOperationSaleType = (contextOperationItem && (contextOperationItem.type === CASHIER_OPERATIONS.SALE
      || contextOperationItem.type === CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT));

    const operationItem = (isOperationSaleType ? {} : contextOperationItem);

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

  renderSaleDetail = (): Object => {
    const { isSaleDetailDialogOpen, contextOperationItem } = this.state;

    const isSaleOperation = (contextOperationItem && (contextOperationItem.type === CASHIER_OPERATIONS.SALE
      || contextOperationItem.type === CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT));

    const shouldShowSaleDetailDialog = (isSaleOperation && isSaleDetailDialogOpen);
    const paidValueText = shouldShowSaleDetailDialog ? this.getPaymentInfoText(contextOperationItem) : '';

    return (
      <SaleDetailDialog
        onToggleSaleDetailDialog={this.onToggleSaleDetailDialog}
        isOpen={shouldShowSaleDetailDialog}
        sale={{ ...contextOperationItem, paidValueText }}
      />
    );
  };

  renderTable = (): Object => {
    const {
      setCurrentCashierTablePage,
      setTableItemsPerPage,
      currentCashier,
      tabInfo,
    } = this.props;

    const { currentTablePage, itemsPerPage } = tabInfo.currentCashier;

    return (
      <Table
        onDetailIconClicked={this.onClickTableDetailIcon}
        updatePageIndex={setCurrentCashierTablePage}
        setItemsPerPage={setTableItemsPerPage}
        dataset={currentCashier.operations}
        currentPage={currentTablePage}
        tabConfig={config.tabConfig}
        itemsPerPage={itemsPerPage}
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
    const { currentCashier } = this.props;
    const { isCloseCashierDialogOpen } = this.state;

    return (
      <CloseCashierDialog
        onToggleCloseCashierDialog={this.onToggleCloseCashierDialog}
        initialMoneyInCashier={currentCashier.initialMoneyCashier}
        totalOutputCashier={currentCashier.totalOutcome}
        totalInputCashier={currentCashier.totalIncome}
        totalProfit={currentCashier.totalProfit}
        onFinishCashier={this.onFinishCashier}
        salesman={currentCashier.salesman}
        isOpen={isCloseCashierDialogOpen}
      />
    );
  };

  render() {
    return (
      <Wrapper>
        {this.renderTopActioButtons()}
        {this.renderTable()}
        {this.renderSaleDetail()}
        {this.renderBottomValues()}
        {this.renderCloseCashierDialog()}
      </Wrapper>
    );
  }
}

export default CashierOpen;
