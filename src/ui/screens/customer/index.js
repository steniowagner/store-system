// @flow

import React, { Component } from 'react';

import EntityTemplate from '../../components/common/entity-template';

import { filterConfig, tabConfig } from './config';
import Form from './form';

class Customer extends Component {
  state = {
    customers: [],
  };

  onCreateCustomer = (customer: Object): void => {
    const { customers } = this.state;

    this.setState({
      customers: [{
        ...customer,
        id: Math.random(),
      }, ...customers],
    });
  };

  onEditCustomer = (userEdited: Object): void => {
    const { customers } = this.state;

    const customerEditedIndex = customers.findIndex(product => product.id === userEdited.id);

    this.setState({
      customers: Object.assign([], customers, { [customerEditedIndex]: userEdited }),
    });
  };

  onRemoveCustomer = (customerId: string): void => {
    const { customers } = this.state;

    this.setState({
      customers: customers.filter(customer => customer.id !== customerId),
    });
  };

  render() {
    const { customers } = this.state;

    return (
      <EntityTemplate
        onRemoveItem={this.onRemoveCustomer}
        onCreateItem={this.onCreateCustomer}
        onEditItem={this.onEditCustomer}
        singularEntityName="Cliente"
        pluralEntityName="Clientes"
        filterConfig={filterConfig}
        tabConfig={tabConfig}
        dataset={customers}
        Form={props => (
          <Form
            {...props}
          />
        )}
      />
    );
  }
}

export default Customer;
