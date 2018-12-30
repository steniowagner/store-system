// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CustomerDebitsCreators } from '../../../store/ducks/customerDebits';
import { Creators as CustomerCreators } from '../../../store/ducks/customer';

import SaleDetailDialog from '../../../components/common/sale-detail-dialog';
import Dialog from '../../../components/common/Dialog';
import Table from '../../../components/common/table';

const TotalDebitWrapper = styled.div`
  margin: 12px 0;
`;

const TotalDebitText = styled.span`
  font-size: 21px;
  color: ${({ theme }) => theme.colors.defaultText};
`;

const tabConfig = [{
  columnTitle: 'Date',
  dataField: 'dateToShow',
}, {
  columnTitle: 'Salesman',
  dataField: 'salesman',
}, {
  columnTitle: 'Code',
  dataField: 'code',
}, {
  columnTitle: 'Total',
  dataField: 'totalText',
}, {
  columnTitle: 'Paid',
  dataField: 'paidValueText',
}, {
  columnTitle: 'Debit',
  dataField: 'inDebitText',
}];

type Props = {
  getAllCustomers: Function,
  debits: Array<Object>,
  removeDebit: Function,
  getDebits: Function,
  id: number,
};

type State = {
  currentPage: number,
};

class Debits extends Component<Props, State> {
  state = {
    isSaleDetailDialogOpen: false,
    isRemoveDialogOpen: false,
    saleSelected: {},
    currentPage: 0,
  };

  componentDidMount() {
    const { getDebits, id } = this.props;

    getDebits(id);
  }

  onToggleSaleDetailDialog = (): void => {
    const { isSaleDetailDialogOpen } = this.state;

    this.setState({
      isSaleDetailDialogOpen: !isSaleDetailDialogOpen,
    });
  };

  onToggleRemoveDialog = (): void => {
    const { isRemoveDialogOpen } = this.state;

    this.setState({
      isRemoveDialogOpen: !isRemoveDialogOpen,
    });
  };

  onRemoveIconClicked = (saleSelected: Object): void => {
    this.setState({
      isRemoveDialogOpen: true,
      saleSelected,
    });
  };

  onDetailIconClicked = (saleSelected: Object): void => {
    this.setState({
      isSaleDetailDialogOpen: true,
      saleSelected,
    });
  };

  onRemoveDebit = () => {
    const { removeDebit, getAllCustomers } = this.props;
    const { saleSelected } = this.state;

    removeDebit(saleSelected);
    getAllCustomers();
  };

  renderSaleDetailDialog = (): Object => {
    const { isSaleDetailDialogOpen, saleSelected } = this.state;

    const sale = {
      ...saleSelected,
      products: (saleSelected.products ? saleSelected.products.data : []),
    };

    return (
      <SaleDetailDialog
        onToggleSaleDetailDialog={this.onToggleSaleDetailDialog}
        isOpen={isSaleDetailDialogOpen}
        sale={sale}
      />
    );
  };

  renderDeleteDialog = (): Object => {
    const { isRemoveDialogOpen } = this.state;
    return (
      <Dialog
        description="If you perform this action, this Debit will be removed, and will not be possible to recover it in any way."
        title="Are you sure that do you want Remove this Debit?"
        negativeAction={this.onToggleRemoveDialog}
        onCloseDialog={this.onToggleRemoveDialog}
        positiveAction={this.onRemoveDebit}
        isOpen={isRemoveDialogOpen}
        disableBackdropClick
        positiveText="YES"
        negativeText="NO"
      />
    );
  };

  renderTable = (): Object => {
    const { currentPage } = this.state;
    const { debits } = this.props;

    return (
      <Table
        onDetailIconClicked={this.onDetailIconClicked}
        onRemoveIconClicked={this.onRemoveIconClicked}
        updatePageIndex={() => {}}
        currentPage={currentPage}
        tabConfig={tabConfig}
        dataset={debits}
        canBeRemoved
      />
    );
  };

  renderTotalDebit = (): Object => {
    const { debits } = this.props;

    const totalDebit = debits.reduce((current, debit) => current + debit.inDebit, 0);

    return (
      <TotalDebitWrapper>
        <TotalDebitText>
          {`Total: $ ${totalDebit.toFixed(2)}`}
        </TotalDebitText>
      </TotalDebitWrapper>
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderTotalDebit()}
        {this.renderTable()}
        {this.renderSaleDetailDialog()}
        {this.renderDeleteDialog()}
      </Fragment>
    );
  }
}

const Creators = Object.assign({}, CustomerCreators, CustomerDebitsCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  debits: state.debits.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Debits);
