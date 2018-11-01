import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import ProductsSelectedList from './components/products-selected-list';
import SelectCustomer from './components/select-customer';
import SelectProduct from './components/select-product';
import FooterValues from './components/footer-values';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

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
    products: [],
  };

  onAddProduct = (product: Object, quantity: string): void => {
    const { products } = this.state;

    const newProduct = {
      quantity: Math.abs(quantity),
      ...product,
    };

    const indexProduct = this.getIndexProductOnList(product);
    const isProductAlreadyOnList = (indexProduct >= 0);

    if (isProductAlreadyOnList) {
      this.handleProductRepeated(indexProduct, quantity);
      return;
    }

    this.setState({
      products: [newProduct, ...products],
    });
  };

  onRemoveProduct = (productSelectedIndex: number) => {
    const { products } = this.state;

    this.setState({
      products: products.filter((productSelected, index) => productSelectedIndex !== index),
    });
  };

  onEditProductQuantity = (indexProductEdited: number, quantity: string): void => {
    const { products } = this.state;
    const productSelected = products[indexProductEdited];

    this.setState({
      products: Object.assign([], products, { [indexProductEdited]: { ...productSelected, quantity } }),
    });
  };

  getIndexProductOnList = (productSearched: Object): boolean => {
    const { products } = this.state;

    const indexProduct = (products.findIndex(product => product.id === productSearched.id));

    return indexProduct;
  };

  handleProductRepeated = (index: number, quantity: string): void => {
    const { products } = this.state;

    const currentQuantity = Number(products[index].quantity);
    const newQuantity = currentQuantity + Math.abs(quantity);

    this.onEditProductQuantity(index, newQuantity);
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

  renderSelectProduct = (): Object => (
    <SelectProduct
      onAddProduct={this.onAddProduct}
    />
  );

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
          {this.renderSelectProduct()}
          {this.renderProductsList()}
          {this.renderFooterValues()}
        </Paper>
      </Container>
    );
  }
}

export default ProductSale;
