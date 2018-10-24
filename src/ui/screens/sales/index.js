import React, { Component } from 'react';

import EntityComponent from '../../components/common/entity-component';

import { filterConfig, tabConfig } from './config';
import Form from './form';

class Sales extends Component {
  state = {
    sales: [{
      customer: 'Stenio Wagner Pereira de Freitas',
      customerId: '1',
      products: [],
    }],
  };

  render() {
    const { sales } = this.state;

    return (
      <EntityComponent
        onRemoveItem={() => {}}
        onCreateItem={() => {}}
        onEditItem={() => {}}
        singularEntityName="Venda"
        pluralEntityName="Vendas"
        ownTitle="NOVA VENDA"
        filterConfig={filterConfig}
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
