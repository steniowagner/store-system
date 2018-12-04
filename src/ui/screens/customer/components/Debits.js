// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CustomerDebitsCreators } from '../../../store/ducks/customerDebits';

import SaleDetailDialog from './SaleWithDebitDetail';
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
  columnTitle: 'Data',
  dataField: 'dateToShow',
}, {
  columnTitle: 'Vendedor',
  dataField: 'salesman',
}, {
  columnTitle: 'Sub-Total',
  dataField: 'subtotalText',
}, {
  columnTitle: 'Total',
  dataField: 'totalText',
}, {
  columnTitle: 'Pago',
  dataField: 'paidValueText',
}, {
  columnTitle: 'Em Débito',
  dataField: 'inDebitText',
}];

type Props = {
  debits: Array<Object>,
  onRemoveDebit: Function,
  getDebits: Function,
  editSale: Function,
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
    const { onRemoveDebit, editSale } = this.props;
    const { saleSelected } = this.state;

    onRemoveDebit(saleSelected.id);

    const saleWithouDebit = {
      ...saleSelected,
      products: JSON.parse(saleSelected.products),
      inDebit: 0,
    };

    editSale(saleWithouDebit);
  };

  renderSaleDetailDialog = (): Object => {
    const { isSaleDetailDialogOpen, saleSelected } = this.state;

    const sale = {
      ...saleSelected,
      products: saleSelected.products ? JSON.parse(saleSelected.products) : [],
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
        description="Se executar esta ação, este Débito será apagado, e não poderá ser recuperado de forma alguma."
        title="Tem certeza que quer Apagar este Registro de Débito?"
        negativeAction={this.onToggleRemoveDialog}
        onCloseDialog={this.onToggleRemoveDialog}
        positiveAction={this.onRemoveDebit}
        isOpen={isRemoveDialogOpen}
        disableBackdropClick
        positiveText="SIM"
        negativeText="NÃO"
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
        withPagination
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
          {`Total: R$ ${totalDebit.toFixed(2)}`}
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

const mapDispatchToProps = dispatch => bindActionCreators(CustomerDebitsCreators, dispatch);

const mapStateToProps = state => ({
  debits: state.debits.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Debits);
