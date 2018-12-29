// @flow

import React, { Component } from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';

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
  username: string,
  tabInfo: Object,
};

type State = {
  isCloseCashierDialogOpen: boolean,
  isSaleDetailDialogOpen: boolean,
  contextOperationItem: any,
};

class CashierOpen extends Component<Props, State> {
  state = {
    isCloseCashierDialogOpen: false,
    contextOperationItem: undefined,
    isSaleDetailDialogOpen: false,
  };

  onAddMoneyCashier = (value: string, reason: string): void => {
    const { onAddMoneyIntoCashier, username } = this.props;
    console.log(username);
    const addMoneyCashierOperation = getNewCashierOperationData(value, reason, username, CASHIER_OPERATIONS.ADD_MONEY);

    onAddMoneyIntoCashier(addMoneyCashierOperation);

    this.restartContextOperationItem();
  };

  onTakeAwaytMoneyCashier = (value: string, reason: string): void => {
    const { onTakeMoneyFromCashier, username } = this.props;
    console.log(username);

    const takeAwaytMoneyCashierOperation = getNewCashierOperationData(value, reason, username, CASHIER_OPERATIONS.TAKE_AWAY_MONEY);

    onTakeMoneyFromCashier(takeAwaytMoneyCashierOperation);

    this.restartContextOperationItem();
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
      contextOperationItem: undefined,
    }, () => onCloseCashier());
  };

  onClickTableEditIcon = (operation: Object): void => {
    this.setState({
      contextOperationItem: { ...operation, mode: 'edit' },
      isSaleDetailDialogOpen: true,
    });
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
      contextOperationItem: undefined,
    });
  };

  restartContextOperationItem = (): void => {
    this.setState({
      contextOperationItem: undefined,
    });
  };

  checkIsOperationSaleType = (contextOperationItem: any): boolean => {
    return !!contextOperationItem && (contextOperationItem.type === CASHIER_OPERATIONS.SALE
      || contextOperationItem.type === CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT);
  };

  renderTopActioButtons = (): Object => {
    const { contextOperationItem } = this.state;

    const isOperationSaleType = this.checkIsOperationSaleType(contextOperationItem);

    const operationItem = (isOperationSaleType ? undefined : contextOperationItem);

    return (
      <TopActionButtons
        restartContextOperationItem={this.restartContextOperationItem}
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

    const isSaleOperation = this.checkIsOperationSaleType(contextOperationItem);

    const shouldShowSaleDetailDialog = (isSaleOperation && isSaleDetailDialogOpen);

    return (
      <SaleDetailDialog
        onToggleSaleDetailDialog={this.onToggleSaleDetailDialog}
        isOpen={shouldShowSaleDetailDialog}
        sale={contextOperationItem}
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

    const dataset = currentCashier.operations.map((operation) => {
      const isOperationSaleType = this.checkIsOperationSaleType(operation);

      return (isOperationSaleType ? operation : { ...operation, canEditSingleItem: true });
    });

    return (
      <Table
        onDetailIconClicked={this.onClickTableDetailIcon}
        onEditIconClicked={this.onClickTableEditIcon}
        updatePageIndex={setCurrentCashierTablePage}
        setItemsPerPage={setTableItemsPerPage}
        currentPage={currentTablePage}
        tabConfig={config.tabConfig}
        itemsPerPage={itemsPerPage}
        dataset={dataset}
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
    const { currentCashier, username } = this.props;
    const { isCloseCashierDialogOpen } = this.state;

    return (
      <CloseCashierDialog
        onToggleCloseCashierDialog={this.onToggleCloseCashierDialog}
        initialMoneyInCashier={currentCashier.initialMoneyCashier}
        totalOutputCashier={currentCashier.totalOutcome}
        totalInputCashier={currentCashier.totalIncome}
        totalProfit={currentCashier.totalProfit}
        onFinishCashier={this.onFinishCashier}
        isOpen={isCloseCashierDialogOpen}
        salesman={username}
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

const mapStateToProps = state => ({
  username: state.auth.user.username,
});

export default connect(mapStateToProps)(CashierOpen);
