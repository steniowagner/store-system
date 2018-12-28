// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import getItemConfig, { ITEMS_TYPES } from './items-config';
import FormPaymentItem from './FormPaymentItem';

const Container = styled.div`
  width: 100%;
  margin-top: 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

type Props = {
  checkFullPayment: Function,
  onSetPaymentInfo: Function,
  paymentInfo: Object,
};

type State = {
  creditCardValue: string,
  debitCardValue: string,
  checkValue: string,
  moneyValue: string,
};

class FormPayment extends Component<Props, State> {
  state = {
    lastInputFocused: '',
    creditCardValue: '',
    debitCardValue: '',
    checkValue: '',
    moneyValue: '',
  };

  componentDidMount() {
    const { paymentInfo } = this.props;

    const {
      creditCardValue,
      debitCardValue,
      checkValue,
      moneyValue,
    } = paymentInfo;

    this.setState({
      creditCardValue,
      debitCardValue,
      checkValue,
      moneyValue,
    }, () => this.afterTypeValue());
  }

  onTypeMoneyValue = (event: Object): void => {
    this.setState({
      lastInputFocused: ITEMS_TYPES.MONEY,
      moneyValue: event.target.value,
    }, () => this.afterTypeValue());
  };

  onTypeCreditCardValue = (event: Object): void => {
    this.setState({
      lastInputFocused: ITEMS_TYPES.CREDIT_CARD,
      creditCardValue: event.target.value,
    }, () => this.afterTypeValue());
  };

  onTypeDebitCardValue = (event: Object): void => {
    this.setState({
      lastInputFocused: ITEMS_TYPES.DEBIT_CARD,
      debitCardValue: event.target.value,
    }, () => this.afterTypeValue());
  };

  onTypeCheckValue = (event: Object): void => {
    this.setState({
      lastInputFocused: ITEMS_TYPES.CHECK,
      checkValue: event.target.value,
    }, () => this.afterTypeValue());
  };

  afterTypeValue = (): void => {
    const { checkFullPayment, onSetPaymentInfo } = this.props;
    const { state } = this;

    const values = {
      creditCardValue: state.creditCardValue,
      debitCardValue: state.debitCardValue,
      checkValue: state.checkValue,
      moneyValue: state.moneyValue,
    };

    const accumulated = Object.values(values).reduce((total, value) => total + (Math.abs(value) || 0), 0);

    checkFullPayment(accumulated, values);
    onSetPaymentInfo(values);
  };

  renderMoneyItem = (): Object => {
    const { lastInputFocused, moneyValue } = this.state;

    const config = getItemConfig(this.onTypeMoneyValue, moneyValue, ITEMS_TYPES.MONEY);

    return (
      <FormPaymentItem
        lastInputFocused={lastInputFocused}
        {...config}
      />
    );
  };

  renderCreditCardItem = (): Object => {
    const { lastInputFocused, creditCardValue } = this.state;

    const config = getItemConfig(this.onTypeCreditCardValue, creditCardValue, ITEMS_TYPES.CREDIT_CARD);

    return (
      <FormPaymentItem
        lastInputFocused={lastInputFocused}
        {...config}
      />
    );
  };

  renderDebitCardItem = (): Object => {
    const { lastInputFocused, debitCardValue } = this.state;

    const config = getItemConfig(this.onTypeDebitCardValue, debitCardValue, ITEMS_TYPES.DEBIT_CARD);

    return (
      <FormPaymentItem
        lastInputFocused={lastInputFocused}
        {...config}
      />
    );
  };

  renderChecktem = (): Object => {
    const { lastInputFocused, checkValue } = this.state;

    const config = getItemConfig(this.onTypeCheckValue, checkValue, ITEMS_TYPES.CHECK);

    return (
      <FormPaymentItem
        lastInputFocused={lastInputFocused}
        {...config}
      />
    );
  };

  render() {
    return (
      <Container>
        {this.renderMoneyItem()}
        <Divider />
        {this.renderCreditCardItem()}
        <Divider />
        {this.renderDebitCardItem()}
        <Divider />
        {this.renderChecktem()}
      </Container>
    );
  }
}

export default FormPayment;
