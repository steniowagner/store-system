// @flow

import React, { Component } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CashierCreators } from '../../../../store/ducks/cashier';

import Table from '../../../../components/common/table';

import CashierDetailDialog from './components/CashierDetail';
import DateFilter from './components/DateFilter';
import Title from './components/Title';

import { filterList, FILTER_TYPES } from '../../../../utils/filter';

import config from './config';

const Container = styled.div`
  margin: 0 4px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
`;

type Props = {
  setPastCashiersTableItemsPerPage: Function,
  setPastCashierDateFilter: Function,
  setPastCashiersTablePage: Function,
  getAllCashiers: Function,
  cashier: Object,
};

type State = {
  isDetailCashierDialogOpen: boolean,
  cashierToDetail: Object,
}

class PastCashiers extends Component<Props, State> {
  state = {
    isDetailCashierDialogOpen: false,
    cashierToDetail: {},
  };

  componentDidMount() {
    const { getAllCashiers } = this.props;

    moment.locale('pt-br');

    getAllCashiers();
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
    const { setPastCashiersTablePage, setPastCashierDateFilter } = this.props;

    setPastCashiersTablePage(0);
    setPastCashierDateFilter(event.target.value);
  };

  onClickDetailTableIcon = (cashier: Object): void => {
    this.setState({
      isDetailCashierDialogOpen: true,
      cashierToDetail: cashier,
    });
  };

  getCashiersToShow = (cashier: Object): Array<Object> => {
    const { pastCashiers, tabInfo } = cashier;
    const { dateFilterValue } = tabInfo.pastCashiers;

    if (!dateFilterValue) {
      return pastCashiers;
    }

    const filterByDateConfig = {
      filterSelected: FILTER_TYPES.DATE.WHEN.SAME,
      value: moment(dateFilterValue),
      type: FILTER_TYPES.DATE.ID,
      dataset: pastCashiers,
    };

    const cashiersToShow = filterList(filterByDateConfig);

    return cashiersToShow;
  };

  renderTitle = (dateFilterValue: string): Object => {
    const title = dateFilterValue && moment(dateFilterValue).format('LL');

    return (
      <Title>
        {title}
      </Title>
    );
  };

  renderFilterInputFitler = (dateFilterValue: string): Object => (
    <DateFilter
      onChooseDateToFilter={this.onChooseDateToFilter}
      dateFilterValue={dateFilterValue}
    />
  );

  renderTable = (tabInfo: Object): Object => {
    const { setPastCashiersTableItemsPerPage, setPastCashiersTablePage, cashier } = this.props;
    const { currentTablePage, itemsPerPage } = tabInfo.pastCashiers;

    const pastCashiers = this.getCashiersToShow(cashier);

    return (
      <Table
        setItemsPerPage={setPastCashiersTableItemsPerPage}
        onDetailIconClicked={this.onClickDetailTableIcon}
        updatePageIndex={setPastCashiersTablePage}
        currentPage={currentTablePage}
        tabConfig={config.tabConfig}
        itemsPerPage={itemsPerPage}
        dataset={pastCashiers}
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
    const { cashier } = this.props;
    const { tabInfo } = cashier;
    const { dateFilterValue } = tabInfo.pastCashiers;

    return (
      <Container>
        <HeaderWrapper>
          {this.renderTitle(dateFilterValue)}
          {this.renderFilterInputFitler(dateFilterValue)}
        </HeaderWrapper>
        {this.renderTable(tabInfo)}
        {this.renderCashierDetail()}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(CashierCreators, dispatch);

const mapStateToProps = state => ({
  cashier: state.cashier,
});

export default connect(mapStateToProps, mapDispatchToProps)(PastCashiers);
