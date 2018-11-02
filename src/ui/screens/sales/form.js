import React from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import ProductSale from '../../components/common/product-sale-component';
import { Section, Wrapper } from '../../components/common/FormUtils';
import ActionFormButton from '../../components/common/ActionFormButton';

const renderProductSale = (props: Object): Object => {
  const {
    setFieldValue,
    values,
    errors,
    mode,
  } = props;

  return (
    <Section>
      <ProductSale
        setFieldValue={setFieldValue}
        values={values}
        errors={errors}
        mode={mode}
      />
    </Section>
  );
};

const SalesForm = (props: Object): Object => {
  const {
    onChageFormToEditMode,
    handleSubmit,
    isSubmitting,
    onRemoveItem,
    mode,
  } = props;

  return (
    <Wrapper>
      <Form>
        {renderProductSale(props)}
        <ActionFormButton
          onChageFormToEditMode={onChageFormToEditMode}
          onRemoveItem={onRemoveItem}
          disabled={isSubmitting}
          onClick={handleSubmit}
          mode={mode}
        />
      </Form>
    </Wrapper>
  );
};

const CustomForm = withFormik({
  mapPropsToValues: ({ item }) => ({
    customer: item.customer || '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({

  })),

  handleSubmit(values, { setSubmitting, props }) {
    const { onCreateItem, onEditItem, mode } = props;

    const properCallback = (mode === 'edit' ? onEditItem : onCreateItem);

    properCallback({
      ...values,
    });

    setSubmitting(false);
  },
})(SalesForm);

export default CustomForm;
