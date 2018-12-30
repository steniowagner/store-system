import React, { Component } from 'react';

import styled from 'styled-components';

import Input from '../../../../CustomInput';

const Container = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const InputWrapper = styled.div`
  width: 28%;
  margin: 0 8px;
`;

type Props = {
  onTypeQuantity: Function,
  salePrice: number,
  refFocus: string,
  quantity: string,
  mode: string,
};

class SelectProductValues extends Component <Props, {}> {
  componentWillReceiveProps(nextProps) {
    const { salePrice, refFocus } = nextProps;

    if (salePrice && (refFocus === 'quantity')) {
      this._inputQuantityRef.focus();
    }
  }

  getInputConfig = (handleChange: Function, value: string, label: string, id: string, type: string): Object => ({
    handleChange,
    value,
    label,
    type,
    id,
  });

  renderInput = (config: Object): Object => {
    const { mode } = this.props;

    const {
      handleChange,
      value,
      label,
      type,
      id,
    } = config;

    const isQuantityField = (id === 'quantity');
    const shouldDisabledField = (!isQuantityField || mode === 'detail');

    return (
      <InputWrapper>
        <Input
          inputRef={(input) => {
            if (isQuantityField) {
              this._inputQuantityRef = input;
            }
          }}
          disabled={shouldDisabledField}
          onChange={handleChange}
          onBlur={() => {}}
          placeholder=""
          label={label}
          value={value}
          type={type}
          error=""
          id={id}
        />
      </InputWrapper>
    );
  };

  renderQuantityInput = (onTypeQuantity: Function, quantity: string): Object => {
    const inputConfig = this.getInputConfig(onTypeQuantity, quantity, 'Quantity', 'quantity', 'number');

    return this.renderInput(inputConfig);
  };

  renderPriceInput = (salePrice: number): Object => {
    const inputConfig = this.getInputConfig(() => {}, salePrice, 'Price', 'price', 'text');

    return this.renderInput(inputConfig);
  };

  renderTotalInput = (salePrice: number, quantity: string): Object => {
    const total = Math.abs(quantity) * salePrice;

    const inputConfig = this.getInputConfig(() => {}, total.toFixed(2), 'Total', 'total', 'text');

    return this.renderInput(inputConfig);
  };

  render() {
    const { onTypeQuantity, salePrice, quantity } = this.props;

    return (
      <Container>
        {this.renderQuantityInput(onTypeQuantity, quantity)}
        {this.renderPriceInput(salePrice)}
        {this.renderTotalInput(salePrice, quantity)}
      </Container>
    );
  }
}

export default SelectProductValues;
