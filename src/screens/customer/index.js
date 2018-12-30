// @flow

import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CustomerCreators } from '../../store/ducks/customer';

import EntityComponent from '../../components/common/entity-component';
import Snackbar from '../../components/common/Snackbar';

import config from './config';
import Form from './form';

type Props = {
  getAllCustomers: Function,
  createCustomer: Function,
  removeCustomer: Function,
  editCustomer: Function,
  customer: Object,
};

class Customer extends Component<Props, {}> {
  state = {
    isSnackbarOpen: false,
  };

  componentDidMount() {
    const { getAllCustomers } = this.props;

    getAllCustomers();
  }

  componentWillReceiveProps(nextProps) {
    const { message, error } = nextProps.customer;

    if (message || error) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
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

  renderSnackbar = (customer: Object): Object => {
    const { isSnackbarOpen } = this.state;
    const { message, error } = customer;

    return (
      <Snackbar
        onCloseSnackbar={() => this.setState({ isSnackbarOpen: false })}
        isOpen={isSnackbarOpen}
        message={message}
        error={error}
      />
    );
  };

  render() {
    const { customer } = this.props;

    const cpfsRegistered = customer.data.map(customerInfo => customerInfo.cpf);
    const rgsRegistered = customer.data.map(customerInfo => customerInfo.rg);

    return (
      <Fragment>
        <EntityComponent
          onRemoveItem={this.onRemoveCustomer}
          onCreateItem={this.onCreateCustomer}
          onEditItem={this.onEditCustomer}
          singularEntityName="Customer"
          pluralEntityName="Customers"
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          dataset={customer.data}
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
        {this.renderSnackbar(customer)}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(CustomerCreators, dispatch);

const mapStateToProps = state => ({
  customer: state.customer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
