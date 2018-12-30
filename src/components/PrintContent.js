// @flow

import React, { Component, Fragment } from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';

import moment from 'moment';
import 'moment/locale/pt-br';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PrintCreators } from '../store/ducks/print';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const BottomValuesWrapper = styled.div`
  margin-top: 24px;
`;

const StoreTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const DocumentTypeText = styled.p`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
`;

const HeaderTextWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const HeaderTitleText = styled.p`
  margin-right: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const HeaderTitleValue = styled.span`
  font-size: 14px;
`;

const OperationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px;
`;

type Props = {
  username: string,
  print: Object,
};

class PrintContent extends Component<Props, {}> {
  state = {
    isBudgetOperation: false,
  };

  componentDidMount() {
    const { print } = this.props;

    this.setState({
      isBudgetOperation: !!print.data.status,
    });
  }

  getDiscountText = (discount: Object): string => {
    const { type, value } = discount;

    if (!value || !type) {
      return '-';
    }

    const discountText = (type === 'percentage' ? `${value}%` : `$ ${parseFloat(value).toFixed(2)}`);

    return discountText;
  };

  renderTextRow = (title: string, value: string): Object => (
    <HeaderTextWrapper>
      <HeaderTitleText>
        {title}
      </HeaderTitleText>
      <HeaderTitleValue>
        {value}
      </HeaderTitleValue>
    </HeaderTextWrapper>
  );

  renderStoreInfo = (): Object => (
    <Fragment>
      <StoreTitle>
        My Store
      </StoreTitle>
      <RowWrapper>
        {this.renderTextRow('Address:', 'My Address, 09')}
        {this.renderTextRow('Landline:', '(85) 3333-3333')}
      </RowWrapper>
      <RowWrapper>
        {this.renderTextRow('Neighborhood:', 'My Neighborhood')}
        {this.renderTextRow('Phone 1:', '(85) 9988-7766')}
      </RowWrapper>
      <RowWrapper>
        {this.renderTextRow('Cep:', '60310-057')}
        {this.renderTextRow('Celular 2:', '(85) 5544-3322')}
      </RowWrapper>
    </Fragment>
  );

  renderOperationTypeInfo = (): Object => {
    const { isBudgetOperation } = this.state;
    const { print } = this.props;

    const BudgetInfo = (
      <OperationRow>
        <DocumentTypeText>
          Budget Receipt
        </DocumentTypeText>
        {this.renderTextRow('Expiration', moment(print.data.validity).format('DD/MM/YYYY'))}
        {this.renderTextRow('Emission', moment().format('lll'))}
      </OperationRow>
    );

    const SaleInfo = (
      <OperationRow>
        <DocumentTypeText>
          Sale Receipt
        </DocumentTypeText>
        {this.renderTextRow('Emission', moment().format('lll'))}
      </OperationRow>
    );

    return (
      <Fragment>
        {isBudgetOperation ? BudgetInfo : SaleInfo}
      </Fragment>
    );
  };

  renderOperationInfo = (): Object => {
    const { print, username } = this.props;
    const { customer, code } = print.data;

    const customerName = (customer.name || '-');

    return (
      <RowWrapper>
        {this.renderTextRow('Code:', code)}
        {this.renderTextRow('Customer:', customerName)}
        {this.renderTextRow('Salesman:', username)}
      </RowWrapper>
    );
  };

  renderTable = () => {
    const { print } = this.props;
    const { datasetMappedIntoPages, currentPage } = print;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Product
            </TableCell>
            <TableCell
              numeric
            >
              Qt.
            </TableCell>
            <TableCell
              numeric
            >
              Unit. Value
            </TableCell>
            <TableCell
              numeric
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datasetMappedIntoPages[currentPage].map(item => (
            <TableRow key={Math.random()}>
              <TableCell component="th" scope="row">
                {item.description}
              </TableCell>
              <TableCell
                numeric
              >
                {item.quantity}
              </TableCell>
              <TableCell
                numeric
              >
                {`$ ${item.salePrice.toFixed(2)}`}
              </TableCell>
              <TableCell
                numeric
              >
                {`$ ${(item.salePrice * item.quantity).toFixed(2)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  renderOperationValues = (): Object => {
    const { print } = this.props;
    const { subtotal, discount, total } = print.data;

    const discountText = this.getDiscountText(discount);

    return (
      <BottomValuesWrapper>
        <RowWrapper>
          {this.renderTextRow('Sub-total:', `$ ${parseFloat(subtotal).toFixed(2)}`)}
          {this.renderTextRow('Discount:', discountText)}
          {this.renderTextRow('Total:', `$ ${parseFloat(total).toFixed(2)}`)}
        </RowWrapper>
      </BottomValuesWrapper>
    );
  };

  render() {
    const { print } = this.props;
    const { shouldRenderDocumentValues, shouldRenderDocumentInfo } = print;

    return (
      <Dialog
        disableBackdropClick
        onClose={() => {}}
        fullScreen
        open
      >
        <Wrapper>
          {shouldRenderDocumentInfo && (
            <Fragment>
              {this.renderStoreInfo()}
              {this.renderOperationTypeInfo()}
              {this.renderOperationInfo()}
            </Fragment>)}
          {this.renderTable()}
          {shouldRenderDocumentValues && this.renderOperationValues()}
        </Wrapper>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PrintCreators, dispatch);

const mapStateToProps = state => ({
  username: state.auth.user.username,
  print: state.print,
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintContent);
