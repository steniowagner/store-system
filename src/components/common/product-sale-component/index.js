// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { calculateSubtotalValue, calculateTotalValue } from './calculateValues';

import ProductsSelectedList from './components/products-selected-list';
import SelectProduct from './components/select-product';
import FooterValues from './components/footer-values';
import TopRow from './components/top-row';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

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

const onRemoveProduct = (productSelectedIndex: number, values: Object, setFieldValue: Function): void => {
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

const handleSaveProductRepeated = (values: Object, products: Array<Object>, index: number, quantity: string, setFieldValue: Function): void => {
  const currentQuantity = Number(products[index].quantity);
  const newQuantity = currentQuantity + Math.abs(quantity);

  onEditProductQuantity(values, index, newQuantity, setFieldValue);
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
    handleSaveProductRepeated(values, products, indexProduct, quantity, setFieldValue);
    return;
  }

  const productsUpdated = [newProduct, ...products];

  setProductsOnForm(productsUpdated, setFieldValue);
  setSaleValues(productsUpdated, setFieldValue, discount);
};

const renderTopRow = (setFieldValue: Function, values: Object, errors: Object, mode: string): Object => {
  const shouldRenderPrintReceiptButton = (mode !== 'create');

  return (
    <TopRow
      shouldRenderPrintReceiptButton={shouldRenderPrintReceiptButton}
      customerSelected={values.customer}
      setFieldValue={setFieldValue}
      error={errors.customer}
      values={values}
      mode={mode}
    />
  );
};

const renderSelectProduct = (handleBlockFormSubmit: Function, setFieldValue: Function, values: Object, mode: string, stock: Array<Object>): Object => (
  <SelectProduct
    onAddProduct={(product, quantity) => onAddProduct(product, quantity, setFieldValue, values)}
    handleBlockFormSubmit={handleBlockFormSubmit}
    values={values}
    stock={stock}
    mode={mode}
  />
);

const renderExtraComponent = (ExtraComponent: Object, setFieldValue: Function, values: Object, errors: Object, mode: string): Object => (
  <ExtraComponent
    setFieldValue={setFieldValue}
    errors={errors}
    values={values}
    mode={mode}
  />
);

const renderProductsList = (setFieldValue: Function, values: Object, errors: Object, mode: string, stock: Array<Object>): Object => (
  <ProductsSelectedList
    onEditProductQuantity={(indexProductEdited, quantity) => onEditProductQuantity(values, indexProductEdited, quantity, setFieldValue)}
    onRemoveProduct={productSelectedIndex => onRemoveProduct(productSelectedIndex, values, setFieldValue)}
    products={values.products}
    error={errors.products}
    stock={stock}
    mode={mode}
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

type Props = {
  handleBlockFormSubmit: Function,
  withExtraComponent: ?boolean,
  ExtraComponent: ?Object,
  setFieldValue: Function,
  stock: Array<Object>,
  values: Object,
  errors: Object,
  mode: string,
};

const ProductSale = ({
  handleBlockFormSubmit,
  withExtraComponent,
  ExtraComponent,
  setFieldValue,
  stock,
  values,
  errors,
  mode,
}: Props): Object => (
  <Container>
    {renderTopRow(setFieldValue, values, errors, mode)}
    {withExtraComponent && renderExtraComponent(ExtraComponent, setFieldValue, values, errors, mode)}
    <Paper>
      {renderSelectProduct(handleBlockFormSubmit, setFieldValue, values, mode, stock)}
      {renderProductsList(setFieldValue, values, errors, mode, stock)}
      {renderFooterValues(setFieldValue, values, mode)}
    </Paper>
  </Container>
);

export default ProductSale;
