// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as SaleCreators } from '../../store/ducks/sale';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import Form from './form';

type Props = {
  getAllSales: Function,
  createSale: Function,
  editSale: Function,
  sale: Arra<Object>,
};

class Sales extends Component<Props, {}> {
  componentDidMount() {
    const { getAllSales } = this.props;

    getAllSales();
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
    const { sale } = this.props;

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
          />
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(SaleCreators, dispatch);

const mapStateToProps = state => ({
  sale: state.sale.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
