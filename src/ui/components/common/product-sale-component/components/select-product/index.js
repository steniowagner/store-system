// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import SelectProductsValues from './components/SelectProductsValues';
import ProductFilter from './components/filter';
import ActionButtom from '../../../ActionButton';

const Container = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-bottom: 2px solid ${({ theme }) => theme.colors.white};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: 8px;
  margin-left: 8px;
`;

type Props = {
  onAddProduct: Function,
  mode: string,
};

type State = {
  productSelected: Object,
  quantity: string,
};

class SelectProduct extends Component<Props, State> {
  state = {
    productSelected: {},
    quantity: '',
  };

  onSelectProduct = (productSelected: Object): void => {
    this.setState({
      productSelected,
    });
  };

  onTypeQuantity = (event: Object): void => {
    this.setState({
      quantity: event.target.value,
    });
  };

  onAddButtonClicked = (): void => {
    const { productSelected, quantity } = this.state;
    const { onAddProduct } = this.props;

    this.setState({
      productSelected: {},
      quantity: '',
    }, () => onAddProduct(productSelected, quantity));
  };

  render() {
    const { productSelected, quantity } = this.state;
    const { mode } = this.props;

    const isSomeProductSelected = !!(Object.entries(productSelected)).length;
    const isSomeQuantitySelected = !!(quantity);

    const shouldDisableButton = (!isSomeProductSelected || !isSomeQuantitySelected);

    return (
      <Container>
        <ProductFilter
          onSelectProduct={this.onSelectProduct}
          productSelected={productSelected}
        />
        <SelectProductsValues
          salePrice={productSelected.salePrice || ''}
          onTypeQuantity={this.onTypeQuantity}
          quantity={quantity}
          mode={mode}
        />
        <ButtonWrapper>
          <ActionButtom
            action={this.onAddButtonClicked}
            disabled={shouldDisableButton}
            withCustomInactiveColor
            title="Adicionar"
          />
        </ButtonWrapper>
      </Container>
    );
  }
}

export default SelectProduct;
