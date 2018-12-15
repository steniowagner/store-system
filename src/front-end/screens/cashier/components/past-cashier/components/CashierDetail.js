// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { getDialogConfig, CASHIER_OPERATIONS } from '../../current-cashier/components/cashier-open/components/top-buttons-values/dialog-config';
import tabConfig from '../../current-cashier/components/cashier-open/config/tabConfig';
import SaleDetailDialgog from '../../../../../components/common/sale-detail-dialog';
import FullScreenDialog from '../../../../../components/common/FullScreenDialog';
import MoneyOperationDialog from '../../MoneyOperationDialog';
import Table from '../../../../../components/common/table';
import BottomValues from '../../bottom-valeus';

const TitleWrapper = styled.div`
  margin: 32px 0;
`;

type Props = {
  onClose: Function,
  cashier: Object,
  isOpen: boolean,
};

type State = {
  saleContextItem: Object,
};

class CashieDetail extends Component<Props, State> {
  state = {
    isInOutCashierOperationDialogOpen: false,
    isSaleDetailDialogOpen: false,
    operationToDetail: {},
    currentPage: 0,
  };

  onToggleSaleDetailDialog = (): void => {
    const { isSaleDetailDialogOpen } = this.state;

    this.setState({
      isSaleDetailDialogOpen: !isSaleDetailDialogOpen,
    });
  };

  onToggleInOutCashierOperationDialog = (): void => {
    const { isInOutCashierOperationDialogOpen } = this.state;

    this.setState({
      isInOutCashierOperationDialogOpen: !isInOutCashierOperationDialogOpen,
    });
  };

  onClickTableDetailIcon = (operation: Object): void => {
    const { type } = operation;

    const isOperationSaleType = (type === CASHIER_OPERATIONS.SALE || type === CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT);
    const stateRef = (isOperationSaleType ? 'isSaleDetailDialogOpen' : 'isInOutCashierOperationDialogOpen');

    this.setState({
      operationToDetail: operation,
      [stateRef]: true,
    });
  };

  onChangeTablePage = (currentPage: number): void => {
    this.setState({
      currentPage,
    });
  };

  renderSaleDetailDialog = (): Object => {
    const { isSaleDetailDialogOpen, operationToDetail } = this.state;

    return (
      <SaleDetailDialgog
        onToggleSaleDetailDialog={this.onToggleSaleDetailDialog}
        isOpen={isSaleDetailDialogOpen}
        sale={operationToDetail}
      />
    );
  };

  renderInOutCashierOperationDetail = (): Object => {
    const { isInOutCashierOperationDialogOpen, operationToDetail } = this.state;
    const { type } = operationToDetail;

    const config = getDialogConfig(type, this.onToggleInOutCashierOperationDialog, true);

    return (
      <MoneyOperationDialog
        onToggleMoneyDialog={this.onToggleInOutCashierOperationDialog}
        isOpen={isInOutCashierOperationDialogOpen}
        {...operationToDetail}
        mode="detail"
        {...config}
      />
    );
  };

  renderDate = (date: string): Object => (
    <TitleWrapper>
      <h2>
        {date}
      </h2>
    </TitleWrapper>
  );

  renderTable = (operations: string): Object => {
    const { currentPage } = this.state;

    const parsedOperations = (operations ? JSON.parse(operations) : []);

    const dataset = parsedOperations.map((operation) => {
      const splittedOperation = operation.dateToShow.split(' ');

      return {
        ...operation,
        timestampText: splittedOperation[splittedOperation.length - 1],
      };
    });

    return (
      <Table
        onDetailIconClicked={this.onClickTableDetailIcon}
        updatePageIndex={this.onChangeTablePage}
        currentPage={currentPage}
        tabConfig={tabConfig}
        dataset={dataset}
      />
    );
  };

  renderBottomValues = (cashier: Object): Object => {
    const {
      initialMoneyCashier,
      totalOutcome,
      totalIncome,
      totalProfit,
    } = cashier;

    return (
      <BottomValues
        initialMoneyCashier={initialMoneyCashier}
        totalOutputCashier={totalOutcome}
        totalInputCashier={totalIncome}
        totalProfit={totalProfit}
      />
    );
  };

  render() {
    const { onClose, cashier, isOpen } = this.props;

    return (
      <FullScreenDialog
        title="DETALHES DO CAIXA"
        onClose={onClose}
        isOpen={isOpen}
      >
        {this.renderDate(cashier.dateToShow)}
        {this.renderTable(cashier.operations)}
        {this.renderBottomValues(cashier)}
        {this.renderSaleDetailDialog()}
        {this.renderInOutCashierOperationDetail()}
      </FullScreenDialog>
    );
  }
}

export default CashieDetail;
