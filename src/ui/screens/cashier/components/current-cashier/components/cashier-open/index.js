// @flow

import React, { Component, Fragment } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import Table from '../../../../../../components/common/table';

import TopActionButtons from './components/top-buttons-values';
import BottomValues from './components/bottom-valeus';
import SaleForm from './components/SaleFormHandler';

import { getNewCashierOperationData, parseSaleTableItem } from './cashier-utils';
import { DIALOG_TYPES } from './components/top-buttons-values/dialog-config';

import config from './config';

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
    creditCardValue: '9',
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
    moneyValue: '40',
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
};

type State = {
  totalInputCashier: string,
  totalOutputCashier: string,
  totalProfit: string,
};

class CashierOpen extends Component<Props, State> {
  state = {
    contextOperationItem: undefined,
    takeAwayMoneyOperations: [],
    addMoneyOperations: [],
    currentTablePage: 0,
    salesOperations: [],
  };

  componentDidMount() {
    moment.locale('pt-br');

    const salesOperations = sales.map(sale => parseSaleTableItem(sale));

    this.setState({
      salesOperations,
    });
  }

  onAddMoneyCashier = (value: string, reason: string): void => {
    const { addMoneyOperations } = this.state;

    const addMoneyCashierOperation = getNewCashierOperationData(value, reason, DIALOG_TYPES.ADD_MONEY);

    this.setState({
      addMoneyOperations: [addMoneyCashierOperation, ...addMoneyOperations],
      contextOperationItem: undefined,
    });
  };

  onTakeAwaytMoneyCashier = (value: string, reason: string): void => {
    const { takeAwayMoneyOperations } = this.state;

    const takeAwaytMoneyCashierOperation = getNewCashierOperationData(value, reason, DIALOG_TYPES.TAKE_AWAY_MONEY);

    this.setState({
      takeAwayMoneyOperations: [takeAwaytMoneyCashierOperation, ...takeAwayMoneyOperations],
    });
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
    });
  };

  onEditSaleOperation = (saleEdited: Object): void => {
    this.setState({
      contextOperationItem: undefined,
    });

    console.log(saleEdited);
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
    const { takeAwayMoneyOperations, addMoneyOperations, salesOperations } = this.state;
    const { initialMoneyInCashier } = this.props;

    return (
      <BottomValues
        takeAwayMoneyOperations={takeAwayMoneyOperations}
        initialMoneyInCashier={initialMoneyInCashier}
        addMoneyOperations={addMoneyOperations}
        salesOperations={salesOperations}
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
      </Fragment>
    );
  }
}

export default CashierOpen;
