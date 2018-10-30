import React, { Component } from 'react';

import styled from 'styled-components';

import ActionButtom from '../../../../ActionButton';
import Input from '../../../../CustomInput';

const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const InputWrapper = styled.div`
  width: 15%;
  margin: 0 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: 8px;
  margin-left: 8px;
`;

type Props = {
  salePrice: number,
};

type State = {
  quantity: string,
};

class SelectProductValues extends Component<Props, State> {
  state = {
    quantity: '',
  };

  onTypeQuantity = (event: Object): void => {
    this.setState({
      quantity: event.target.value,
    });
  };

  getInputConfig = (handleChange: Function, value: string, label: string, id: string): Object => ({
    handleChange,
    value,
    label,
    id,
  });

  renderInput = (config: Object): Object => {
    const {
      handleChange,
      value,
      label,
      id,
    } = config;

    const isDisabled = (id === 'price' || id === 'total');

    return (
      <InputWrapper>
        <Input
          disabled={isDisabled}
          onChange={handleChange}
          onBlur={() => {}}
          placeholder=""
          type="number"
          value={value}
          label={label}
          error=""
          id={id}
        />
      </InputWrapper>
    );
  };

  renderQuantityInput = (): Object => {
    const { quantity } = this.state;

    const inputConfig = this.getInputConfig(this.onTypeQuantity, quantity, 'Quantidade', 'quantity');

    return this.renderInput(inputConfig);
  };

  renderPriceInput = (): Object => {
    const { salePrice } = this.props;

    const inputConfig = this.getInputConfig(() => {}, salePrice, 'Preço', 'price');

    return this.renderInput(inputConfig);
  };

  renderTotalInput = (): Object => {
    const { salePrice } = this.props;
    const { quantity } = this.state;

    const total = Math.abs(quantity) * salePrice;

    const inputConfig = this.getInputConfig(() => {}, total, 'Total', 'total');

    return this.renderInput(inputConfig);
  };

  render() {
    return (
      <Container>
        {this.renderQuantityInput()}
        {this.renderPriceInput()}
        {this.renderTotalInput()}
        <ButtonWrapper>
          <ActionButtom
            title="Adicionar"
          />
        </ButtonWrapper>
      </Container>
    );
  }
}

export default SelectProductValues;
