import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import SelectCustomer from './components/select-customer';
import FooterValues from './components/footer-values';
import ProductsSelectedList from './components/products-selected-list';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const generateData = () => {
  const list = [];

  for (let i = 0; i < 10; i += 1) {
    list.push({
      quantity: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
      salePrice: (Math.random() * (100 - 1) + 1).toFixed(2),
      description: `PRODUTO ${i}`,
      id: i,
    });
  }

  return list;
};

type Props = {
  setFieldValue: Function,
  values: Object,
  errors: Object,
  mode: string,
};

type State = {
  products: Array<Object>,
};

class ProductSale extends Component<Props, State> {
  state = {
    products: generateData(),
  };

  onRemoveProduct = (productSelectedIndex: number) => {
    const { products } = this.state;

    this.setState({
      products: products.filter((productSelected, index) => productSelectedIndex !== index),
    });
  };

  onEditProductQuantity = (indexProductEdited: number, quantity: number): void => {
    const { products } = this.state;
    const productSelected = products[indexProductEdited];

    this.setState({
      products: Object.assign([], products, { [indexProductEdited]: { ...productSelected, quantity } }),
    });
  };

  renderSelectCustomer = (): Object => {
    const {
      setFieldValue,
      values,
      errors,
      mode,
    } = this.props;

    return (
      <SelectCustomer
        customerSelected={values.customer}
        setFieldValue={setFieldValue}
        error={errors.customer}
        mode={mode}
      />
    );
  };

  renderProductsList = (): Object => {
    const { products } = this.state;

    return (
      <ProductsSelectedList
        onEditProductQuantity={this.onEditProductQuantity}
        onRemoveProduct={this.onRemoveProduct}
        products={products}
      />
    );
  };

  renderFooterValues = (): Object => {
    const { products } = this.state;
    const { mode } = this.props;

    return (
      <FooterValues
        products={products}
        mode={mode}
      />
    );
  };

  render() {
    return (
      <Container>
        {this.renderSelectCustomer()}
        <Paper>
          {this.renderProductsList()}
          {this.renderFooterValues()}
        </Paper>
      </Container>
    );
  }
}

export default ProductSale;
