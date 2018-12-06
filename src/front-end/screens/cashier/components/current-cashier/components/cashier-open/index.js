// @flow

import React, { Component, Fragment } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import CloseCashierDialog from './components/CloseCashierDialog';
import TopActionButtons from './components/top-buttons-values';
import BottomValues from '../../../bottom-valeus';
import SaleForm from './components/SaleFormHandler';

import { DIALOG_TYPES } from './components/top-buttons-values/dialog-config';
import Table from '../../../../../../components/common/table';
import config from './config';

import {
  calculateTotalCashierOperationValue,
  getNewCashierOperationData,
  calculateTotalInputMoney,
  calculateTotalProfit,
  parseSaleTableItem,
} from './cashier-utils';

type Props = {
  onEditInOutCashierOperation: Function,
  onTakeMoneyFromCashier: Function,
  onAddMoneyIntoCashier: Function,
  onCloseCashier: Function,
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
    takeAwayMoneyOperations: [],
    addMoneyOperations: [],
    totalOutputCashier: 0,
    totalInputCashier: 0,
    currentTablePage: 0,
    totalProfit: 0,
    salesOperations: [],
  };

  onAddMoneyCashier = (value: string, reason: string): void => {
    const { onAddMoneyIntoCashier } = this.props;

    const addMoneyCashierOperation = getNewCashierOperationData(value, reason, DIALOG_TYPES.ADD_MONEY);

    onAddMoneyIntoCashier(addMoneyCashierOperation);
  };

  onTakeAwaytMoneyCashier = (value: string, reason: string): void => {
    const { onTakeMoneyFromCashier } = this.props;

    const takeAwaytMoneyCashierOperation = getNewCashierOperationData(value, reason, DIALOG_TYPES.TAKE_AWAY_MONEY);

    onTakeMoneyFromCashier(takeAwaytMoneyCashierOperation);
  };

  onEditCashierOperation = (valueEdited: string, reasonEdited: string): void => {
    const { onEditInOutCashierOperation } = this.props;
    const { contextOperationItem } = this.state;

    onEditInOutCashierOperation(contextOperationItem, valueEdited, reasonEdited);

    /* const { contextOperationItem } = this.state;
    const { type } = contextOperationItem;

    const { dataset, stateRef } = this.getProperCashierOperationDataset(type);

    const operationEditedIndex = dataset.findIndex(operation => operation.id === contextOperationItem.id);
    const operation = dataset[operationEditedIndex];

    const operationEdited = {
      ...operation,
      reason: reasonEdited,
      valueText: `R$ ${Number(valueEdited).toFixed(2)}`,
      value: Number(valueEdited).toFixed(2),
    };

    this.setState({
      [stateRef]: Object.assign([], dataset, {
        [operationEditedIndex]: operationEdited,
      }),
      contextOperationItem: undefined,
    }, () => this.updateCashierValues()); */
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
    }, () => this.updateCashierValues());
  };

  onClickTableDetailIcon = (operation: Object): void => {
    this.setState({
      contextOperationItem: { ...operation, mode: 'detail' },
    });
  };

  onClickTableEditIcon = (operation: Object): void => {
    console.log(operation)
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

  getProperCashierOperationDataset = (type: string): Array<Object> => {
    const { takeAwayMoneyOperations, addMoneyOperations } = this.state;

    const operationInfo = (type === DIALOG_TYPES.ADD_MONEY
      ? { dataset: addMoneyOperations, stateRef: 'addMoneyOperations' }
      : { dataset: takeAwayMoneyOperations, stateRef: 'takeAwayMoneyOperations' });

    return operationInfo;
  };

  updateCashierValues = (): void => {
    const { takeAwayMoneyOperations, addMoneyOperations, salesOperations } = this.state;

    const totalOutputCashier = calculateTotalCashierOperationValue(takeAwayMoneyOperations);
    const totalInputCashier = calculateTotalInputMoney(addMoneyOperations, salesOperations);
    const totalProfit = calculateTotalProfit(salesOperations);

    this.setState({
      totalOutputCashier,
      totalInputCashier,
      totalProfit,
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
      contextOperationItem.type === DIALOG_TYPES.SALE ? undefined : contextOperationItem
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

    const shouldShowForm = contextOperationItem && (contextOperationItem.type === DIALOG_TYPES.SALE);

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
    const { totalOutputCashier, totalInputCashier, totalProfit } = this.state;
    const { initialMoneyInCashier } = this.props;

    return (
      <BottomValues
        initialMoneyInCashier={initialMoneyInCashier}
        totalOutputCashier={totalOutputCashier}
        totalInputCashier={totalInputCashier}
        totalProfit={totalProfit}
      />
    );
  };

  renderCloseCashierDialog = (): Object => {
    const {
      isCloseCashierDialogOpen,
      totalOutputCashier,
      totalInputCashier,
      totalProfit,
    } = this.state;

    const { initialMoneyInCashier } = this.props;

    return (
      <CloseCashierDialog
        onToggleCloseCashierDialog={this.onToggleCloseCashierDialog}
        initialMoneyInCashier={initialMoneyInCashier}
        totalOutputCashier={totalOutputCashier}
        onFinishCashier={this.onFinishCashier}
        totalInputCashier={totalInputCashier}
        isOpen={isCloseCashierDialogOpen}
        totalProfit={totalProfit}
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
