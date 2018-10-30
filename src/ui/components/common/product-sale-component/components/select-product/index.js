// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import SelectProductsValues from './components/SelectProductsValues';
import ProductFilter from './components/ProductFilter';

const Container = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-bottom: 2px solid ${({ theme }) => theme.colors.white};
`;

class SelectProduct extends Component {
  state = {
    productsSelected: [],
    productSelected: {},
  };

  onSelectProduct = (productSelected: Object): void => {
    this.setState({
      productSelected,
    });
  };

  onAddProduct = (product: Object): void => {
    const { productsSelected } = this.state;

    this.setState({
      productsSelected: [product, ...productsSelected],
    });
  };

  render() {
    const { productSelected } = this.state;

    return (
      <Container>
        <ProductFilter
          onSelectProduct={this.onSelectProduct}
        />
        <SelectProductsValues
          salePrice={productSelected.salePrice || ''}
        />
      </Container>
    );
  }
}

export default SelectProduct;
