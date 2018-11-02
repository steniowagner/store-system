import React from 'react';

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

const onAddProduct = (product: Object, quantity: string): void => {
  const newProduct = {
    quantity: Math.abs(quantity),
    ...product,
  };

  const indexProduct = this.getIndexProductOnList(product);
  const isProductAlreadyOnList = (indexProduct >= 0);

  if (isProductAlreadyOnList) {
    this.handleSaveProductRepeated(indexProduct, quantity);
    return;
  }

  this.setState({
    products: [newProduct, ...products],
  }, () => this.setProductsOnForm());
};

const onRemoveProduct = (productSelectedIndex: number) => {
  const { products } = this.state;

  this.setState({
    products: products.filter((productSelected, index) => productSelectedIndex !== index),
  });
};

const onEditProductQuantity = (indexProductEdited: number, quantity: string): void => {
  const { products } = this.state;
  const productSelected = products[indexProductEdited];

  this.setState({
    products: Object.assign([], products, {
      [indexProductEdited]: {
        ...productSelected,
        quantity,
      },
    }),
  }, () => this.setProductsOnForm());
};

const getIndexProductOnList = (productSearched: Object): number => {
  const { products } = this.state;

  const indexProduct = (products.findIndex(product => product.id === productSearched.id));

  return indexProduct;
};

const setProductsOnForm = (): void => {
  const { setFieldValue } = this.props;
  const { products } = this.state;

  setFieldValue('products', products);
};

const handleSaveProductRepeated = (index: number, quantity: string): void => {
  const { products } = this.state;

  const currentQuantity = Number(products[index].quantity);
  const newQuantity = currentQuantity + Math.abs(quantity);

  this.onEditProductQuantity(index, newQuantity);
};

const renderSelectCustomer = (setFieldValue: Function, values: Object, errors: Object, mode: string): Object => {
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

const renderSelectProduct = (): Object => (
  <SelectProduct
    onAddProduct={this.onAddProduct}
  />
);

const renderProductsList = (): Object => {
  const { products } = this.state;

  return (
    <ProductsSelectedList
      onEditProductQuantity={this.onEditProductQuantity}
      onRemoveProduct={this.onRemoveProduct}
      products={products}
    />
  );
};

const renderFooterValues = (setFieldValue: Function, values: Object, mode: string): Object => (
  <FooterValues
    setFieldValue={setFieldValue}
    products={values.products}
    mode={mode}
  />
);

const ProductSale = ({
  setFieldValue,
  values,
  errors,
  mode,
}: Props): Object => {

  return (
    <Container>
      {renderSelectCustomer()}
      <Paper>
        {renderSelectProduct()}
        {renderProductsList()}
        {renderFooterValues()}
      </Paper>
    </Container>
  );
};

export default ProductSale;
