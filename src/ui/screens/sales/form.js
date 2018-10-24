import React from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import {
  rendeRowWithSingleItem,
  renderRowWithTwoItems,
  renderSectionTitle,
  getRowItemObject,
  Section,
  Wrapper,
} from '../../components/common/FormUtils';

import ProductSale from '../../components/common/product-sale-component';
import ActionFormButton from '../../components/common/ActionFormButton';

const renderSelectCustomer = (props: Object) => {
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
    isSubmitting,
    onRemoveItem,
    handleSubmit,
    mode,
  } = props;

  return (
    <Wrapper>
      <Form>
        {renderSelectCustomer(props)}
        <ActionFormButton
          onChageFormToEditMode={onChageFormToEditMode}
          onClick={handleSubmit}
          onRemoveItem={onRemoveItem}
          disabled={isSubmitting}
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
    customer: Yup.string()
      .required('O Cliente é obrigatório.'),
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
