// @flow

import React, { Component } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import styled from 'styled-components';

import Input from '../../../../CustomInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  width: 50%;
`;

const Error = styled.span`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.danger}
`;

type Props = {
  onSetValues: Function,
  total: number,
  item: Object,
};

type State = {
  percentageValue: string,
  optionSelected: string,
  moneyValue: string,
};

const ERRORS = {
  MAX_PERCENTAGE: 'The Max Discount is 100%',
  MAX_MONEY: 'The Max Discount is the Total Value',
};

class DiscountItem extends Component<Props, State> {
  state = {
    percentageValue: '',
    optionSelected: '',
    moneyValue: '',
    error: '',
  };

  componentDidMount() {
    const { item } = this.props;
    const { type, value } = item;

    const percentageValue = (type === 'percentage' ? value : '');
    const moneyValue = (type === 'money' ? value : '');

    this.setState({
      optionSelected: type,
      percentageValue,
      moneyValue,
    });
  }

  componentDidUpdate() {
    this.handleInputFocus();
  }

  onTypeMoneyValue = (moneyValue: string): void => {
    const { onSetValues } = this.props;

    const isAboveTotal = this.checkMoneyDiscountAboveTotal(moneyValue);

    if (isAboveTotal) {
      this.handleMoneyDiscountAboveTotal();
      return;
    }

    this.setState({
      moneyValue,
      error: '',
    }, () => onSetValues('money', Math.abs(moneyValue)));
  };

  onTypePercentageValue = (percentageValue: string): void => {
    const { onSetValues } = this.props;

    const isAboveMax = this.checkPercentageAboveMax(percentageValue);

    if (isAboveMax) {
      this.handlePercentageAboveMax();
      return;
    }

    this.setState({
      percentageValue,
      error: '',
    }, () => onSetValues('percentage', Math.abs(percentageValue)));
  };

  onSelectOption = (optionSelected: string): void => {
    this.setState({
      optionSelected,
    }, () => this.setValuesOnParent(optionSelected));
  };

  setValuesOnParent = (optionSelected: string): void => {
    const { percentageValue, moneyValue } = this.state;
    const { onSetValues } = this.props;

    const selectedFieldValue = (optionSelected === 'percentage' ? percentageValue : moneyValue);

    onSetValues(optionSelected, selectedFieldValue);
  };

  getRowConfig = (onChange: Function, stateRef: string, label: string, id: string): Object => ({
    onChange,
    stateRef,
    label,
    id,
  });

  checkPercentageAboveMax = (percentageValue: string): boolean => (Math.abs(percentageValue) > 100);

  checkMoneyDiscountAboveTotal = (moneyValue: string): boolean => {
    const { total } = this.props;

    return Number(moneyValue) > total;
  };

  handlePercentageAboveMax = (): void => {
    const { onSetValues } = this.props;

    this.setState({
      error: ERRORS.MAX_PERCENTAGE,
      percentageValue: '',
    }, () => onSetValues('percentage', ''));
  };

  handleMoneyDiscountAboveTotal = (): void => {
    const { onSetValues } = this.props;

    this.setState({
      error: ERRORS.MAX_MONEY,
      moneyValue: '',
    }, () => onSetValues('money', ''));
  };

  handleSetInputRef = (input: Object, id: string): void => {
    if (id === 'percentage') {
      this._inputPercentageRef = input;
    }

    if (id === 'money') {
      this._inputMoneyRef = input;
    }
  };

  handleInputFocus = (): void => {
    const { optionSelected } = this.state;

    if (optionSelected === 'percentage') {
      this._inputPercentageRef.focus();
    }

    if (optionSelected === 'money') {
      this._inputMoneyRef.focus();
    }
  };

  renderRow = (config: Object): Object => {
    const {
      onChange,
      stateRef,
      label,
      id,
    } = config;

    const { state } = this;
    const inputValue = state[stateRef];
    const { optionSelected } = state;

    return (
      <RowWrapper>
        <FormControlLabel
          label={label}
          control={(
            <Radio
              onChange={event => this.onSelectOption(event.target.value)}
              checked={optionSelected === id}
              color="primary"
            />
          )}
          value={id}
        />
        <InputWrapper>
          <Input
            inputRef={(input) => { this.handleSetInputRef(input, id); }}
            disabled={optionSelected !== id}
            onChange={event => onChange(event.target.value)}
            value={inputValue}
            onBlur={() => {}}
            placeholder=""
            type="number"
            error=""
            id={id}
          />
        </InputWrapper>
      </RowWrapper>
    );
  };

  renderPercentageRow = (): Object => {
    const config = this.getRowConfig(this.onTypePercentageValue, 'percentageValue', 'As Percentage', 'percentage');

    return this.renderRow(config);
  };

  renderMoneyRow = (): Object => {
    const config = this.getRowConfig(this.onTypeMoneyValue, 'moneyValue', 'As Money', 'money');

    return this.renderRow(config);
  };

  render() {
    const { error } = this.state;

    return (
      <Container>
        <Error>
          {error}
        </Error>
        {this.renderPercentageRow()}
        {this.renderMoneyRow()}
      </Container>
    );
  }
}

export default DiscountItem;
