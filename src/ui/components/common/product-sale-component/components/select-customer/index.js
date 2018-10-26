// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import SelectUserDialog from './components/SelectUserDialog';

import ActionButton from '../../../ActionButton';
import Input from '../../../CustomInput';

const Wrapper = styled.div``;

const InputContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 50%;
  margin-right: 16px;
`;

const InputButtonWrapper = styled.div`
  display: flex;
  margin-left: 8px;
  margin-top: ${({ hasError }) => (hasError ? 0 : 20)}px;
`;

type Props = {
  customerSelected: Object,
  setFieldValue: Function,
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

  onToggleDialogChooseCustomer = (): void => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    });
  };

  onSelectCustomer = (customer: Object): void => {
    const { setFieldValue } = this.props;

    setFieldValue('customer', customer);
  };

  renderInputField = (): Object => {
    const { customerSelected, error } = this.props;

    const value = (typeof customerSelected === 'object' ? customerSelected.name : customerSelected);

    return (
      <InputWrapper>
        <Input
          placeholder="Selecione o Cliente"
          onChange={() => {}}
          onBlur={() => {}}
          error={error}
          value={value}
          id="customer"
          type="text"
          label="Cliente"
          disabled
        />
      </InputWrapper>
    );
  };

  render() {
    const { customerSelected, error, mode } = this.props;
    const { isDialogOpen } = this.state;

    const isCustomerValidString = (typeof customerSelected === 'string' && !!customerSelected);
    const hasCustomerSelected = (isCustomerValidString || !!customerSelected.name);
    const actionButtonTitle = (hasCustomerSelected ? 'EDITAR' : 'SELECIONAR');

    return (
      <Wrapper>
        <InputContainer>
          {this.renderInputField()}
          <InputButtonWrapper
            hasError={error}
          >
            <ActionButton
              action={() => this.onToggleDialogChooseCustomer()}
              disabled={mode === 'detail'}
              title={actionButtonTitle}
              withIcon={false}
            />
          </InputButtonWrapper>
        </InputContainer>
        <SelectUserDialog
          onToggle={() => this.onToggleDialogChooseCustomer()}
          onSelectCustomer={this.onSelectCustomer}
          customerSelected={customerSelected}
          isOpen={isDialogOpen}
        />
      </Wrapper>
    );
  }
}

export default SelectCustomer;
