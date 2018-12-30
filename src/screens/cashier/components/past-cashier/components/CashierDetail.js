// @flow

import React, { Component } from 'react';

import LockOpen from '@material-ui/icons/LockOpen';
import LockClosed from '@material-ui/icons/Lock';

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

const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const OpenClosedText = styled.span`
  weight: 700,
`;

const OpenClosedIconWrapper = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  border-radius: 21px;
  background-color: ${({ theme }) => theme.colors.affirmative};
`;

const OpenClosedWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OpenClosedItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const LockClosedIcon = styled(LockClosed)`
  color: ${({ theme }) => theme.colors.white};
`;

const LockOpenIcon = styled(LockOpen)`
  color: ${({ theme }) => theme.colors.white};
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

  renderOpenCloseCashierInfo = (openBy: string, closedBy: string): Object => {
    return (
      <OpenClosedWrapper>
        <OpenClosedItemWrapper>
          <OpenClosedIconWrapper>
            <LockOpenIcon />
          </OpenClosedIconWrapper>
          <OpenClosedText>
            {openBy}
          </OpenClosedText>
        </OpenClosedItemWrapper>
        <OpenClosedItemWrapper>
          <OpenClosedIconWrapper>
            <LockClosedIcon />
          </OpenClosedIconWrapper>
          <OpenClosedText>
            {closedBy}
          </OpenClosedText>
        </OpenClosedItemWrapper>
      </OpenClosedWrapper>
    );
  };

  renderHeader = (cashier: Object): Object => {
    return (
      <TopWrapper>
        {this.renderDate(cashier.dateToShow)}
        {this.renderOpenCloseCashierInfo(cashier.openBy, cashier.closedBy)}
      </TopWrapper>
    );
  };

  renderTable = (cashier: Object): Object => {
    const { currentPage } = this.state;
    const operations = (cashier.operations || []);

    const dataset = operations.map((operation) => {
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
        title="CASHIER DETAILS"
        onClose={onClose}
        isOpen={isOpen}
      >
        {this.renderHeader(cashier)}
        {this.renderTable(cashier)}
        {this.renderBottomValues(cashier)}
        {this.renderSaleDetailDialog()}
        {this.renderInOutCashierOperationDetail()}
      </FullScreenDialog>
    );
  }
}

export default CashieDetail;
