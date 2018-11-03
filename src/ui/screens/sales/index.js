// @flow

import React, { Component } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import EntityComponent from '../../components/common/entity-component';
import { filterConfig, tabConfig } from './config';
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

    const newSale = {
      customerName: sale.customer.name || '-',
      dateToShow: moment().format('lll'),
      date: moment().format('L'),
      username: 'steniowagner',
      ...sale,
    };

    this.setState({
      sales: [newSale, ...sales],
    });
  };

  render() {
    const { sales } = this.state;

    return (
      <EntityComponent
        onRemoveItem={() => {}}
        onCreateItem={this.onCreateSale}
        onEditItem={() => {}}
        filterConfig={filterConfig}
        singularEntityName="Venda"
        pluralEntityName="Vendas"
        withOwnTitle="NOVA VENDA"
        tabConfig={tabConfig}
        dataset={sales}
        canBeCreated
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
