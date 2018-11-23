// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as StockCreators } from '../../store/ducks/stock';
import { Creators as SaleCreators } from '../../store/ducks/sale';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import Form from './form';

type Props = {
  getAllSales: Function,
  createSale: Function,
  getStock: Function,
  editSale: Function,
  stock: Arra<Object>,
  sale: Arra<Object>,
};

class Sales extends Component<Props, {}> {
  componentDidMount() {
    const { getAllSales, getStock } = this.props;

    getAllSales();
    getStock();
  }

  onCreateSale = (sale: Object): void => {
    const { createSale } = this.props;

    createSale(sale);
  };

  onEditSale = (saleEdited: Object): void => {
    const { editSale } = this.props;

    editSale(saleEdited);
  };

  render() {
    const { sale, stock } = this.props;

    return (
      <EntityComponent
        filterConfig={config.filterConfig}
        onCreateItem={this.onCreateSale}
        tabConfig={config.tabConfig}
        onEditItem={this.onEditSale}
        singularEntityName="Venda"
        pluralEntityName="Vendas"
        withOwnTitle="NOVA VENDA"
        dataset={sale}
        canBeCreated
        canBeEdited
        Form={props => (
          <Form
            {...props}
            stock={stock}
          />
        )}
      />
    );
  }
}

const Creators = Object.assign({}, SaleCreators, StockCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  stock: state.stock.data,
  sale: state.sale.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
