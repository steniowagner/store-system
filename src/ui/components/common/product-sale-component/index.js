import React, { Fragment } from 'react';

import SelectCustomer from './components/select-customer';

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
  <Fragment>
    <SelectCustomer
      customerSelected={values.customer}
      setFieldValue={setFieldValue}
      error={errors.customer}
      mode={mode}
    />
  </Fragment>
);

export default ProductSale;
