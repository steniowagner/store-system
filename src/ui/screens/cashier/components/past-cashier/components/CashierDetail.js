// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import FullScreenDialog from '../../../../../components/common/FullScreenDialog';
import Table from '../../../../../components/common/table';
import BottomValues from '../../bottom-valeus';
import SaleDetailDialog from './SaleDetailDialog';

const TitleWrapper = styled.div`
  margin: 32px 0;
`;

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

const tabConfig = [{
  columnTitle: 'Horário',
  dataField: 'timestamp',
}, {
  columnTitle: 'Operação',
  dataField: 'type',
}, {
  columnTitle: 'Cliente',
  dataField: 'customerName',
}, {
  columnTitle: 'Vendedor',
  dataField: 'username',
}, {
  columnTitle: 'Valor',
  dataField: 'valueText',
}, {
  columnTitle: 'Desconto',
  dataField: 'discountText',
}, {
  columnTitle: 'Total',
  dataField: 'totalText',
}, {
  columnTitle: 'Pago',
  dataField: 'valuePaid',
}, {
  columnTitle: 'Pendente',
  dataField: 'pending',
}];

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
    isSaleFormDialogOpen: false,
    saleContextItem: {},
    saleFormMode: '',
  };

  onToggleSaleDetailDialog = (): void => {
    const { isSaleFormDialogOpen } = this.state;

    this.setState({
      isSaleFormDialogOpen: !isSaleFormDialogOpen,
    });
  };

  onClickTableEditIcon = (sale: Object): void => {
    this.setState({
      isSaleFormDialogOpen: true,
      saleContextItem: sale,
      saleFormMode: 'edit',
    });
  };

  onClickTableDetailIcon = (sale: Object): void => {
    this.setState({
      isSaleFormDialogOpen: true,
      saleContextItem: sale,
      saleFormMode: 'detail',
    });
  };

  renderSaleDetailDialog = (): Object => {
    const { isSaleFormDialogOpen } = this.state;

    return (
      <SaleDetailDialog
        onToggleSaleDetailDialog={this.onToggleSaleDetailDialog}
        isOpen={isSaleFormDialogOpen}
      />
    );
  };

  renderDate = (): Object => (
    <TitleWrapper>
      <h2>
        13 de novembro de 2018
      </h2>
    </TitleWrapper>
  );

  renderTable = (): Object => (
    <Table
      onDetailIconClicked={this.onClickTableDetailIcon}
      onEditIconClicked={this.onClickTableEditIcon}
      updatePageIndex={() => {}}
      tabConfig={tabConfig}
      currentPage={0}
      dataset={sales}
      canBeEdited
    />
  );

  render() {
    const { onClose, cashier, isOpen } = this.props;

    return (
      <FullScreenDialog
        title="DETALHES DO CAIXA"
        onClose={onClose}
        isOpen={isOpen}
      >
        {this.renderDate()}
        {this.renderTable()}
        <BottomValues
          initialMoneyInCashier="3"
          totalOutputCashier="3"
          totalInputCashier="3"
          totalProfit="3"
        />
        {this.renderSaleDetailDialog()}
      </FullScreenDialog>
    );
  }
}

export default CashieDetail;
