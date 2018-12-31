// @flow

import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CashierCreators } from '../../../../store/ducks/cashier';

import { CASHIER_OPERATIONS } from './components/cashier-open/components/top-buttons-values/dialog-config';

import CashierClosed from './components/cashier-closed';
import CashierOpen from './components/cashier-open';

type Props = {
  setCurrentCashierTableItemsPerPage: Function,
  setCurrentCashierTablePage: Function,
  requestSaleUpdate: Function,
  onCloseCashier: Function,
  createCashier: Function,
  editCashier: Function,
  cashier: Object,
};

type State = {
  initialMoneyInCashier: string,
};

class CurrentCashier extends Component<Props, State> {
  state = {
    initialMoneyInCashier: '',
  };

  onSetInitialMoneyInCashier = (initialMoneyInCashier: string): void => {
    const { createCashier } = this.props;

    this.setState({
      initialMoneyInCashier,
    }, () => createCashier(initialMoneyInCashier));
  };

  onEditInOutCashierOperation = (inOutOperationEdited: Object, valueEdited: string, reasonEdited: string): void => {
    const { editCashier, cashier } = this.props;

    const { index, type, value } = inOutOperationEdited;
    const { currentCashier } = cashier;

    let stateRef = '';
    let pastQuantity = 0;

    if (type === CASHIER_OPERATIONS.TAKE_AWAY_MONEY) {
      stateRef = 'totalOutcome';
      pastQuantity = currentCashier.totalOutcome - parseFloat(value);
    }

    if (type === CASHIER_OPERATIONS.ADD_MONEY) {
      stateRef = 'totalIncome';
      pastQuantity = currentCashier.totalIncome - parseFloat(value);
    }

    const operationEdited = {
      ...currentCashier.operations[index],
      valueText: `$ ${parseFloat(valueEdited).toFixed(2)}`,
      value: parseFloat(valueEdited),
      reason: reasonEdited,
    };

    const operationsEdited = Object.assign([], currentCashier.operations, { [index]: operationEdited });

    const cashierUpdated = {
      ...currentCashier,
      operations: operationsEdited,
      [stateRef]: pastQuantity + parseFloat(valueEdited),
    };

    editCashier(cashierUpdated);
  };

  onTakeMoneyFromCashier = (operationInfo: Object): void => {
    const { editCashier, cashier } = this.props;
    const { currentCashier } = cashier;

    const totalOutcome = operationInfo.value + currentCashier.totalOutcome;

    const currentCashierUpdated = {
      ...currentCashier,
      totalOutcome,
      operations: [operationInfo, ...currentCashier.operations],
    };

    editCashier(currentCashierUpdated);
  };

  onAddMoneyIntoCashier = (operationInfo: Object): void => {
    const { editCashier, cashier } = this.props;
    const { currentCashier } = cashier;

    const totalIncome = operationInfo.value + currentCashier.totalIncome;

    const currentCashierUpdated = {
      ...currentCashier,
      totalIncome,
      operations: [operationInfo, ...currentCashier.operations],
    };

    editCashier(currentCashierUpdated);
  };

  onCloseCashier = (): void => {
    const { onCloseCashier } = this.props;

    this.setState({
      initialMoneyInCashier: '',
    }, () => onCloseCashier());
  };

  renderCashierClosed = (): Object => {
    const { initialMoneyInCashier } = this.state;

    return (
      <CashierClosed
        onSetInitialMoneyInCashier={this.onSetInitialMoneyInCashier}
        initialMoneyInCashier={initialMoneyInCashier}
      />
    );
  };

  renderCashierOpen = (): Object => {
    const {
      setCurrentCashierTableItemsPerPage,
      setCurrentCashierTablePage,
      requestSaleUpdate,
      cashier,
    } = this.props;

    const { currentCashier, tabInfo } = cashier;

    return (
      <CashierOpen
        setCurrentCashierTablePage={(currentPageTable: number): void => setCurrentCashierTablePage(currentPageTable)}
        setTableItemsPerPage={(itemsPerPage: number): void => setCurrentCashierTableItemsPerPage(itemsPerPage)}
        onEditInOutCashierOperation={this.onEditInOutCashierOperation}
        onTakeMoneyFromCashier={this.onTakeMoneyFromCashier}
        onAddMoneyIntoCashier={this.onAddMoneyIntoCashier}
        requestSaleUpdate={requestSaleUpdate}
        onCloseCashier={this.onCloseCashier}
        currentCashier={currentCashier}
        tabInfo={tabInfo}
      />
    );
  };

  render() {
    const { cashier } = this.props;
    const { isCashierOpen } = cashier;

    return (
      <Fragment>
        {isCashierOpen ? this.renderCashierOpen() : this.renderCashierClosed()}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(CashierCreators, dispatch);

const mapStateToProps = state => ({
  cashier: state.cashier,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCashier);
