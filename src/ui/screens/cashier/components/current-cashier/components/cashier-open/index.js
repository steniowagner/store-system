// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import Table from '../../../../../../components/common/table';

import TopActionButtons from './components/top-buttons-values';
import BottomValues from './components/bottom-valeus';

import config from './config';

const data = [{
  timestamp: 'Às 15:30',
  operationType: 'Venda',
  customer: 'Stenio Wagner Pereira de freitas',
  username: 'swmyself',
  value: 'R$ 120.50',
  discount: 'R$ 10.00',
  total: 'R$ 500.00',
  valuePaid: 'R$ 500.00',
  isPending: 'Não',
}, {
  id: Math.random(),
  timestamp: 'Às 15:30',
  operationType: 'Inserção',
  customer: '-',
  username: 'swmyself',
  value: 'R$ 120.50',
  discount: '-',
  total: '-',
  valuePaid: '-',
  isPending: '-',
  reason: 'Inserção-my-REASON',
}, {
  id: Math.random(),
  timestamp: 'Às 15:30',
  operationType: 'Retirada',
  customer: '-',
  username: 'swmyself',
  value: 'R$ 999.51',
  discount: '-',
  total: '-',
  valuePaid: '-',
  isPending: '-',
  reason: 'Retirada-my-REASON',
}];

const Wrapper = styled.div`
  width: 100%;
  dispaly: flex;
  justify-content: space-between;
`;

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
    takeAwayNoneyOperations: [],
    addMoneyOperations: [],
    operations: data,
    currentTablePage: 0,
    totalProfit: '',
  };

  onAddMoneyCashier = (amount: string, reason: string): void => {
    const { addMoneyOperations } = this.state;

    const addMoneyCashierOperation = {
      value: Number(amount),
      reason,
    };

    this.setState({
      addMoneyOperations: [addMoneyCashierOperation, ...addMoneyOperations],
    });
  };

  onTakeAwaytMoneyCashier = (amount: string, reason: string): void => {
    const { takeAwayNoneyOperations } = this.state;

    const takeAwaytMoneyCashierOperation = {
      value: Number(amount),
      reason,
    };

    this.setState({
      takeAwayNoneyOperations: [takeAwaytMoneyCashierOperation, ...takeAwayNoneyOperations],
    });
  };

  onEditOperation = (valueEdited: string, reasonEdited: string): void => {
    const { contextOperationItem, operations } = this.state;

    const operationEditedIndex = data.findIndex(operation => operation.id === contextOperationItem.id);
    const operation = operations[operationEditedIndex];

    const value = `R$ ${Number(valueEdited).toFixed(2)}`;

    const operationEdited = {
      ...operation,
      reason: reasonEdited,
      value,
    };

    this.setState({
      operations: Object.assign([], operations, {
        [operationEditedIndex]: operationEdited,
      }),
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

  calculateTotalAmount = (dataset: Array<Object>): number => {
    const total = dataset.reduce((current, operation) => current + operation.value, 0);

    return total;
  };

  renderTopActioButtons = (): Object => {
    const { contextOperationItem } = this.state;

    return (
      <TopActionButtons
        onTakeAwaytMoneyCashier={this.onTakeAwaytMoneyCashier}
        onAddMoneyCashier={this.onAddMoneyCashier}
        operationItem={contextOperationItem}
        onEditItem={this.onEditOperation}
      />
    );
  }

  renderTable = (): Object => {
    const { currentTablePage, operations } = this.state;

    return (
      <Table
        onDetailIconClicked={this.onClickTableDetailIcon}
        onEditIconClicked={this.onClickTableEditIcon}
        updatePageIndex={this.onTablePageChange}
        currentPage={currentTablePage}
        tabConfig={config.tabConfig}
        canBeRemoved={false}
        dataset={operations}
        canBeEdited
      />
    );
  };

  renderBottomValues = (): Object => {
    const { takeAwayNoneyOperations, addMoneyOperations } = this.state;
    const { initialMoneyInCashier } = this.props;

    const totalOutputCashier = this.calculateTotalAmount(takeAwayNoneyOperations);
    const totalInputCashier = this.calculateTotalAmount(addMoneyOperations);

    return (
      <BottomValues
        initialMoneyInCashier={initialMoneyInCashier}
        totalOutputCashier={totalOutputCashier}
        totalInputCashier={totalInputCashier}
      />
    );
  };

  render() {
    return (
      <Fragment>
        <Wrapper>
          {this.renderTopActioButtons()}
          {this.renderTable()}
          {this.renderBottomValues()}
        </Wrapper>
      </Fragment>
    );
  }
}

export default CashierOpen;
