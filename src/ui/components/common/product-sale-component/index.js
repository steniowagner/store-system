import React from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { calculateSubtotalValue, calculateTotalValue } from './calculateValues';

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

const getIndexProductOnList = (products: Array<Object>, productSearched: Object): number => {
  const indexProduct = (products.findIndex(product => product.id === productSearched.id));

  return indexProduct;
};

const clearNumericalFields = (setFieldValue: Function): void => {
  setFieldValue('discount', {});
  setFieldValue('subtotal', 0);
  setFieldValue('total', 0);
};

const setProductsOnForm = (products: Array<Object>, setFieldValue: Function): void => setFieldValue('products', products);

const setTotalValueOnForm = (total: number, setFieldValue: Function): void => setFieldValue('total', total.toFixed(2));

const setSubtotalValueOnForm = (subtotal: number, setFieldValue: Function): void => setFieldValue('subtotal', subtotal.toFixed(2));

const setSaleValues = (products: Array<Object>, setFieldValue: Function, discount: Object): void => {
  const subtotal = calculateSubtotalValue(products);
  const total = calculateTotalValue(discount, subtotal);

  setTotalValueOnForm(total, setFieldValue);
  setSubtotalValueOnForm(subtotal, setFieldValue);
};

const onRemoveProduct = (productSelectedIndex: number, values: Object, setFieldValue: Function) => {
  const { products, discount } = values;
  const productsUpdated = products.filter((productSelected, index) => productSelectedIndex !== index);

  setProductsOnForm(productsUpdated, setFieldValue);
  setSaleValues(productsUpdated, setFieldValue, discount);

  const hasProductsOnList = !!(productsUpdated.length);

  if (!hasProductsOnList) {
    clearNumericalFields(setFieldValue);
  }
};

const onEditProductQuantity = (values: Object, indexProductEdited: number, quantity: string, setFieldValue: Function): void => {
  const { products, discount } = values;
  const productSelected = products[indexProductEdited];

  const productsUpdated = Object.assign([], products, {
    [indexProductEdited]: {
      ...productSelected,
      quantity,
    },
  });

  setProductsOnForm(productsUpdated, setFieldValue);
  setSaleValues(productsUpdated, setFieldValue, discount);
};

const handleSaveProductRepeated = (products: Array<Object>, index: number, quantity: string, setFieldValue: Function): void => {
  const currentQuantity = Number(products[index].quantity);
  const newQuantity = currentQuantity + Math.abs(quantity);

  onEditProductQuantity(products, index, newQuantity, setFieldValue);
};

const onAddProduct = (product: Object, quantity: string, setFieldValue: Function, values: Object): void => {
  const { products, discount } = values;

  const newProduct = {
    quantity: Math.abs(quantity),
    ...product,
  };

  const indexProduct = getIndexProductOnList(products, product);
  const isProductAlreadyOnList = (indexProduct >= 0);

  if (isProductAlreadyOnList) {
    handleSaveProductRepeated(products, indexProduct, quantity, setFieldValue);
    return;
  }

  const productsUpdated = [newProduct, ...products];

  setProductsOnForm(productsUpdated, setFieldValue);
  setSaleValues(productsUpdated, setFieldValue, discount);
};

const renderSelectCustomer = (setFieldValue: Function, values: Object, errors: Object, mode: string): Object => (
  <SelectCustomer
    customerSelected={values.customer}
    setFieldValue={setFieldValue}
    error={errors.customer}
    mode={mode}
  />
);

const renderSelectProduct = (setFieldValue: Function, values: Object): Object => (
  <SelectProduct
    onAddProduct={(product, quantity) => onAddProduct(product, quantity, setFieldValue, values)}
  />
);

const renderProductsList = (setFieldValue: Function, values: Object, errors: Object): Object => (
  <ProductsSelectedList
    onEditProductQuantity={(indexProductEdited, quantity) => onEditProductQuantity(values, indexProductEdited, quantity, setFieldValue)}
    onRemoveProduct={productSelectedIndex => onRemoveProduct(productSelectedIndex, values, setFieldValue)}
    products={values.products}
    error={errors.products}
  />
);

const renderFooterValues = (setFieldValue: Function, values: Object, mode: string): Object => {
  const {
    observation,
    products,
    subtotal,
    discount,
    total,
  } = values;

  return (
    <FooterValues
      setFieldValue={setFieldValue}
      setSaleValues={setSaleValues}
      subtotal={Number(subtotal)}
      observation={observation}
      total={Number(total)}
      discount={discount}
      products={products}
      mode={mode}
    />
  );
};

const ProductSale = ({
  setFieldValue,
  values,
  errors,
  mode,
}: Props): Object => (
  <Container>
    {renderSelectCustomer(setFieldValue, values, errors, mode)}
    <Paper>
      {renderSelectProduct(setFieldValue, values)}
      {renderProductsList(setFieldValue, values, errors)}
      {renderFooterValues(setFieldValue, values, mode)}
    </Paper>
  </Container>
);

export default ProductSale;
