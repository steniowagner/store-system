// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import moment from 'moment';
import 'moment/locale/pt-br';

import Table from '../../../../components/common/table';

import CashierDetailDialog from './components/CashierDetail';
import DateFilter from './components/DateFilter';
import Title from './components/Title';

import config from './config';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
`;

class PastCashiers extends Component {
  state = {
    isDetailCashierDialogOpen: false,
    cashierToDetail: {},
    dateFilterValue: '',
    currentPage: 0,
  };

  componentDidMount() {
    moment.locale('pt-br');
  }

  onToggleCashierDialog = (): void => {
    const { isDetailCashierDialogOpen } = this.state;

    this.setState({
      isDetailCashierDialogOpen: !isDetailCashierDialogOpen,
    });
  };

  onTableDetailIconClicked = (item: Object): void => {
    this.setState({
      isDetailCashierDialogOpen: true,
      cashierToDetail: item,
    });
  };

  onChooseDateToFilter = (event: Object): void => {
    this.setState({
      dateFilterValue: event.target.value,
    });
  };

  onTablePageChange = (newPage: number): void => {
    this.setState({
      currentPage: newPage,
    });
  };

  renderTitle = (): Object => {
    const { dateFilterValue } = this.state;
    const title = dateFilterValue && moment(dateFilterValue).format('LL');

    return (
      <Title>
        {title}
      </Title>
    );
  };

  renderFilterInputFitler = (): Object => {
    const { dateFilterValue } = this.state;

    return (
      <DateFilter
        onChooseDateToFilter={this.onChooseDateToFilter}
        dateFilterValue={dateFilterValue}
      />
    );
  };

  renderTable = (): Object => {
    const { currentPage } = this.state;

    return (
      <Table
        onDetailIconClicked={this.onTableDetailIconClicked}
        updatePageIndex={this.onTablePageChange}
        currentPage={currentPage}
        tabConfig={config.tabConfig}
        dataset={Array(10).fill({
          date: '13 de novembro de 2018',
          initalCashierValue: 'R$ 29.90',
          totalInputMoney: 'R$ 50.50',
          totalOutputMoney: 'R$ 25.41',
          profit: 'R$ 21.90',
        })}
      />
    );
  };

  renderCashierDetail = (): Object => {
    const { isDetailCashierDialogOpen, cashierToDetail } = this.state;

    return (
      <CashierDetailDialog
        onClose={this.onToggleCashierDialog}
        isOpen={isDetailCashierDialogOpen}
        cashier={cashierToDetail}
      />
    );
  };

  render() {
    return (
      <Fragment>
        <HeaderWrapper>
          {this.renderTitle()}
          {this.renderFilterInputFitler()}
        </HeaderWrapper>
        {this.renderTable()}
        {this.renderCashierDetail()}
      </Fragment>
    );
  }
}

export default PastCashiers;
