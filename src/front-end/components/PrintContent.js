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
  margin: 18px 0 12px 0;
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

type Props = {
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
        Eunice Livros
      </StoreTitle>
      <RowWrapper>
        {this.renderTextRow('Endereço:', 'Rua Henrique Elery, 129')}
        {this.renderTextRow('Telefone:', '(85) 3283-6895')}
      </RowWrapper>
      <RowWrapper>
        {this.renderTextRow('Bairro:', 'Carlito Pamplona')}
        {this.renderTextRow('Celular 1:', '(85) 98627-7550')}
      </RowWrapper>
      <RowWrapper>
        {this.renderTextRow('Cep:', '60310-057')}
        {this.renderTextRow('Celular 2:', '(85) 98670-8319')}
      </RowWrapper>
    </Fragment>
  );

  renderOperationTypeInfo = (): Object => {
    const { isBudgetOperation } = this.state;
    const { print } = this.props;

    const { typeText, contextTitle, value } = (isBudgetOperation
      ? {
        typeText: 'Comprovante de Orçamento',
        contextTitle: 'Vencimento:',
        value: moment(print.data.validity).format('DD/MM/YYYY'),
      }
      : {
        typeText: 'Comprovante de Venda',
        contextTitle: 'Emissão:',
        value: moment().format('lll'),
      });

    return (
      <RowWrapper>
        <DocumentTypeText>
          {typeText}
        </DocumentTypeText>
        {this.renderTextRow(contextTitle, value)}
      </RowWrapper>
    );
  };

  renderOperationInfo = (): Object => {
    const { print } = this.props;
    const { customer, code } = print.data;

    const customerName = (customer.name || '-');

    return (
      <RowWrapper>
        {this.renderTextRow('Código:', code)}
        {this.renderTextRow('Cliente:', customerName)}
        {this.renderTextRow('Vendedor:', 'steniowagner')}
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
              Produto
            </TableCell>
            <TableCell
              numeric
            >
              Qtd.
            </TableCell>
            <TableCell
              numeric
            >
              Valor Unid.
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
                {`R$ ${item.salePrice.toFixed(2)}`}
              </TableCell>
              <TableCell
                numeric
              >
                {`R$ ${(item.salePrice * item.quantity).toFixed(2)}`}
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

    const discountText = !!discount && (discount.type === 'percentage' ? `${discount.value}%` : `R$ ${parseFloat(discount.value).toFixed(2)}`);

    return (
      <BottomValuesWrapper>
        <RowWrapper>
          {this.renderTextRow('Sub-total:', `R$ ${parseFloat(subtotal).toFixed(2)}`)}
          {this.renderTextRow('Desconto:', discountText)}
          {this.renderTextRow('Total:', `R$ ${parseFloat(total).toFixed(2)}`)}
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
  print: state.print,
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintContent);
