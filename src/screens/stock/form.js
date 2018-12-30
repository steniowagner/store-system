import React from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import {
  renderRowWithTwoItems,
  renderSectionTitle,
  getRowItemObject,
  Section,
  Wrapper,
  RowItem,
  Row,
} from '../../components/common/FormUtils';

import ActionFormButton from '../../components/common/ActionFormButton';
import Input from '../../components/common/CustomInput';

const renderProductDescriptionSection = (props: Object): Object => {
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
  } = props;

  return (
    <Section>
      {renderSectionTitle('Product')}
      <Row>
        <RowItem>
          <Input
            error={touched.description && errors.description}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Description"
            id="description"
            placeholder=""
            type="text"
            disabled
          />
        </RowItem>
      </Row>
    </Section>
  );
};

const renderAddressSection = (props: Object): Object => {
  const minStockQuantityFieldData = getRowItemObject('Min Quantity', 'Enter the Min Quantity of this Product in Stock', 'text', 'minStockQuantity');
  const stockQuantityData = getRowItemObject('Current Quantity', 'Enter the Quantity of this Product in Stock', 'text', 'stockQuantity');

  return (
    <Section>
      {renderSectionTitle('Product Information in Stock')}
      {renderRowWithTwoItems(stockQuantityData, minStockQuantityFieldData, props)}
    </Section>
  );
};

const StockForm = (props: Object): Object => {
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
        {renderProductDescriptionSection(props)}
        {renderAddressSection(props)}
        <ActionFormButton
          onChageFormToEditMode={onChageFormToEditMode}
          onRemoveItem={onRemoveItem}
          disabled={isSubmitting}
          onClick={handleSubmit}
          entity="Stock"
          mode={mode}
        />
      </Form>
    </Wrapper>
  );
};

const CustomForm = withFormik({
  mapPropsToValues: ({ item }) => ({
    minStockQuantity: item.minStockQuantity || '',
    stockQuantity: item.stockQuantity || '',
    description: item.description || '',
  }),

  validationSchema: () => Yup.lazy(values => Yup.object().shape({
    description: Yup.string()
      .required('The Description is required.'),

    minStockQuantity: Yup.string()
      .test('min-stock-quantity', 'Min Quantity is greater than the Current Quantity in Stock.', () => {
        const { minStockQuantity, stockQuantity } = values;

        const minStockQuantityValue = (minStockQuantity || 0);
        const stockQuantityValue = (stockQuantity || 0);

        return minStockQuantityValue <= stockQuantityValue;
      })
      .required('The Min Stock Quantity is required.'),

    stockQuantity: Yup.string()
      .required('The Current Stock Quantity is required.'),
  })),

  handleSubmit(values, { setSubmitting, props }) {
    const { onEditItem } = props;

    onEditItem({ ...values });

    setSubmitting(false);
  },
})(StockForm);

export default CustomForm;
