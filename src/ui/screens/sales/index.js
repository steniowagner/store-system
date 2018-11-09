// @flow

import React, { Component } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import Form from './form';

class Sales extends Component {
  state = {
    sales: [],
  };

  componentDidMount() {
    moment.locale('pt-br');
  }

  onCreateSale = (sale: Object): void => {
    const { sales } = this.state;

    console.log(sale);

    const newSale = {
      customerName: sale.customer.name || '-',
      dateToShow: moment().format('lll'),
      date: moment().format('L'),
      username: 'steniowagner',
      id: Math.random(),
      ...sale,
    };

    this.setState({
      sales: [newSale, ...sales],
    });
  };

  onEditSale = (sale: Object): void => {
    const { sales } = this.state;

    const saleEdited = {
      ...sale,
      customerName: sale.customer.name || '-',
    };

    const saleEditedIndex = sales.findIndex(saleItem => saleItem.id === saleEdited.id);

    this.setState({
      sales: Object.assign([], sales, { [saleEditedIndex]: saleEdited }),
    });
  };

  render() {
    const { sales } = this.state;

    return (
      <EntityComponent
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        onCreateItem={this.onCreateSale}
        onEditItem={this.onEditSale}
        onRemoveItem={() => {}}
        singularEntityName="Venda"
        pluralEntityName="Vendas"
        withOwnTitle="NOVA VENDA"
        dataset={sales}
        canBeCreated
        canBeEdited
        withFilter
        Form={props => (
          <Form
            {...props}
          />
        )}
      />
    );
  }
}

export default Sales;
