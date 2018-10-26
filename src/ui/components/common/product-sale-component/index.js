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
      mode={mode}
    />
  </Container>
);

export default ProductSale;
