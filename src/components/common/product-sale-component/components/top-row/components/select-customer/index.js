// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CustomerDebitsCreators } from '../../../../../../../store/ducks/customerDebits';
import { Creators as CustomerCreators } from '../../../../../../../store/ducks/customer';

import SelectUserDialog from './components/SelectUserDialog';

import ActionButton from '../../../../../ActionButton';
import Input from '../../../../../CustomInput';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const InputWrapper = styled.div`
  width: 40%;
  margin-right: 16px;
`;

const InputButtonWrapper = styled.div`
  display: flex;
  align-self: center;
  margin-bottom: ${({ hasError }) => (hasError ? 20 : 0)}px;
`;

type Props = {
  getAllCustomers: Function,
  customerSelected: Object,
  customers: Array<Object>,
  setFieldValue: Function,
  getDebits: Function,
  error: Object,
  mode: string,
};

type State = {
  isDialogOpen: boolean,
};

class SelectCustomer extends Component<Props, State> {
  state = {
    isDialogOpen: false,
  };

  componentDidMount() {
    const { getAllCustomers } = this.props;

    getAllCustomers();
  }

  onToggleDialogChooseCustomer = (): void => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    });
  };

  onSelectCustomer = (customer: Object): void => {
    const { setFieldValue, getDebits } = this.props;

    setFieldValue('customer', customer);

    getDebits(customer.id);
  };

  renderInputField = (): Object => {
    const { customerSelected, error } = this.props;
    const value = (typeof customerSelected === 'object' ? customerSelected.name : customerSelected);

    return (
      <Input
        placeholder="Select a Costumer"
        onChange={() => {}}
        onBlur={() => {}}
        error={error}
        value={value}
        id="customer"
        type="text"
        label=""
        disabled
      />
    );
  };

  renderSelectCustomerButton = (): Object => {
    const { customerSelected, mode, error } = this.props;

    const isCustomerValidString = (typeof customerSelected === 'string' && !!customerSelected);
    const hasCustomerSelected = (isCustomerValidString || !!customerSelected.name);
    const actionButtonTitle = (hasCustomerSelected ? 'EDIT' : 'SELECT');

    return (
      <InputButtonWrapper
        hasError={!!error}
      >
        <ActionButton
          action={() => this.onToggleDialogChooseCustomer()}
          disabled={mode === 'detail'}
          title={actionButtonTitle}
          withIcon={false}
        />
      </InputButtonWrapper>
    );
  };

  renderDialog = (): Object => {
    const { customerSelected, customers } = this.props;
    const { isDialogOpen } = this.state;

    return (
      <SelectUserDialog
        onToggle={() => this.onToggleDialogChooseCustomer()}
        onSelectCustomer={this.onSelectCustomer}
        customerSelected={customerSelected}
        customers={customers}
        isOpen={isDialogOpen}
      />
    );
  };

  render() {
    return (
      <Wrapper>
        <InputWrapper>
          {this.renderInputField()}
        </InputWrapper>
        {this.renderSelectCustomerButton()}
        {this.renderDialog()}
      </Wrapper>
    );
  }
}

const Creators = Object.assign({}, CustomerDebitsCreators, CustomerCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  customers: state.customer.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCustomer);
