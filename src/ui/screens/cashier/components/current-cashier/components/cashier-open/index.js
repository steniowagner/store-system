// @flow

import React, { Component, Fragment } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import CloseCashierDialog from './components/CloseCashierDialog';
import TopActionButtons from './components/top-buttons-values';
import BottomValues from './components/bottom-valeus';
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

const sales = [{
  timestamp: 'Hoje às 15:30',
  customer: {
    cpf: '123',
    rg: '123',
    id: '123',
    name: 'Ana Eridan Pereira de Freitas',
  },
  username: 'swmyself',
  discount: {
    type: 'percentage',
    value: 10,
  },
  isInDebit: false,
  observation: 'observation',
  paymentInfo: {
    checkValue: '',
    creditCardValue: '9.16',
    debitCardValue: '',
    moneyValue: '50',
  },
  shouldPrintReceipt: true,
  subtotal: '65.73',
  total: '59.16',
  products: [{
    barCode: '123',
    brand: 'Samsung',
    description: 'Mouse',
    id: 0.14423952784441352,
    quantity: 3,
    salePrice: 21.91,
    costPrice: 20,
  }],
}, {
  timestamp: 'Hoje às 15:30',
  customer: {
    cpf: '123',
    rg: '123',
    id: '123',
    name: 'Ana Eridan Pereira de Freitas',
  },
  username: 'swmyself',
  discount: {
    type: 'percentage',
    value: 10,
  },
  isInDebit: false,
  observation: 'observation',
  paymentInfo: {
    checkValue: '',
    creditCardValue: '9',
    debitCardValue: '',
    moneyValue: '50.16',
  },
  shouldPrintReceipt: true,
  subtotal: '65.73',
  total: '59.16',
  products: [{
    barCode: '123',
    brand: 'Samsung',
    description: 'Mouse',
    id: 0.14423952784441352,
    quantity: 3,
    salePrice: 21.91,
    costPrice: 20,
  }],
}];

type Props = {
  initialMoneyInCashier: string,
  onCloseCashier: Function,
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

  componentDidMount() {
    moment.locale('pt-br');

    const salesOperations = sales.map(sale => parseSaleTableItem(sale));

    this.setState({
      salesOperations,
    }, () => this.updateCashierValues());
  }

  onAddMoneyCashier = (value: string, reason: string): void => {
    const { addMoneyOperations } = this.state;

    const addMoneyCashierOperation = getNewCashierOperationData(value, reason, DIALOG_TYPES.ADD_MONEY);

    this.setState({
      addMoneyOperations: [addMoneyCashierOperation, ...addMoneyOperations],
      contextOperationItem: undefined,
    }, () => this.updateCashierValues());
  };

  onTakeAwaytMoneyCashier = (value: string, reason: string): void => {
    const { takeAwayMoneyOperations } = this.state;

    const takeAwaytMoneyCashierOperation = getNewCashierOperationData(value, reason, DIALOG_TYPES.TAKE_AWAY_MONEY);

    this.setState({
      takeAwayMoneyOperations: [takeAwaytMoneyCashierOperation, ...takeAwayMoneyOperations],
    }, () => this.updateCashierValues());
  };

  onEditCashierOperation = (valueEdited: string, reasonEdited: string): void => {
    const { contextOperationItem } = this.state;
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
    }, () => this.updateCashierValues());
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

  getDatasetItems = (): Array<Object> => {
    const { takeAwayMoneyOperations, addMoneyOperations, salesOperations } = this.state;

    const dataset = [...takeAwayMoneyOperations, ...addMoneyOperations, ...salesOperations];

    return dataset;
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

    const dataset = this.getDatasetItems();

    return (
      <Table
        onDetailIconClicked={this.onClickTableDetailIcon}
        onEditIconClicked={this.onClickTableEditIcon}
        updatePageIndex={this.onTablePageChange}
        currentPage={currentTablePage}
        tabConfig={config.tabConfig}
        canBeRemoved={false}
        dataset={dataset}
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
