import React from 'react';

import styled from 'styled-components';

import SelectCustomer from './components/select-customer';
import FooterValues from './components/footer-values';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

type Props = {
  setFieldValue: Function,
  errors: Object,
  values: Object,
  mode: string,
};

const products = [{
  quantity: 1,
  salePrice: 2,
}, {
  quantity: 1,
  salePrice: 3,
}, {
  quantity: 3,
  salePrice: 4,
}];

const ProductSale = ({
  setFieldValue,
  values,
  errors,
  mode,
}: Props): Object => (
  <Container>
    <SelectCustomer
      customerSelected={values.customer}
      setFieldValue={setFieldValue}
      error={errors.customer}
      mode={mode}
    />
    <FooterValues
      products={products}
      mode={mode}
    />
  </Container>
);

export default ProductSale;
