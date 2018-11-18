// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CustomerCreators } from '../../store/ducks/customer';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import Form from './form';

type Props = {
  unsubscribeEvents: Function,
  getAllCustomers: Function,
  createCustomer: Function,
  removeCustomer: Function,
  editCustomer: Function,
  customers: Array<Object>,
};

class Customer extends Component<Props, {}> {
  componentDidMount() {
    const { getAllCustomers } = this.props;

    getAllCustomers();
  }

  componentWillUnmount() {
    const { unsubscribeEvents } = this.props;

    unsubscribeEvents();
  }

  onCreateCustomer = (customer: Object): void => {
    const { createCustomer } = this.props;

    createCustomer(customer);
  };

  onEditCustomer = (customToEdited: Object): void => {
    const { editCustomer } = this.props;

    editCustomer(customToEdited);
  };

  onRemoveCustomer = (customerId: number): void => {
    const { removeCustomer } = this.props;

    removeCustomer(customerId);
  };

  render() {
    const { customers } = this.props;

    const cpfsRegistered = customers.map(customer => customer.cpf);
    const rgsRegistered = customers.map(customer => customer.rg);

    return (
      <EntityComponent
        onRemoveItem={this.onRemoveCustomer}
        onCreateItem={this.onCreateCustomer}
        onEditItem={this.onEditCustomer}
        singularEntityName="Cliente"
        pluralEntityName="Clientes"
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        dataset={customers}
        canBeCreated
        canBeRemoved
        canBeEdited
        Form={props => (
          <Form
            cpfsRegistered={cpfsRegistered}
            rgsRegistered={rgsRegistered}
            {...props}
          />
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(CustomerCreators, dispatch);

const mapStateToProps = state => ({
  customers: state.customer.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
