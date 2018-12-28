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
      {renderSectionTitle('Produto')}
      <Row>
        <RowItem>
          <Input
            error={touched.description && errors.description}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Descrição"
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
  const minStockQuantityFieldData = getRowItemObject('Quantidade Mínima', 'Informe a Quantidade Mínima deste Produto em Estoque', 'text', 'minStockQuantity');
  const stockQuantityData = getRowItemObject('Quantidade Atual', 'Informe a Quantidade Atual deste Produto em Estoque', 'text', 'stockQuantity');

  return (
    <Section>
      {renderSectionTitle('Informações do Produto no Estoque')}
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
          entity="Estoque"
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
      .required('A Descrição do Produto é Obrigatória.'),

    minStockQuantity: Yup.string()
      .test('min-stock-quantity', 'Quantidade Mínima Maior que a Quantidade em Estoque.', () => {
        const { minStockQuantity, stockQuantity } = values;

        const minStockQuantityValue = (minStockQuantity || 0);
        const stockQuantityValue = (stockQuantity || 0);

        return minStockQuantityValue <= stockQuantityValue;
      })
      .required('A Quantidade Mínima em Estoque é Obrigatória.'),

    stockQuantity: Yup.string()
      .required('A Quantidade Atual em Estoque é Obrigatória.'),
  })),

  handleSubmit(values, { setSubmitting, props }) {
    const { onEditItem } = props;

    onEditItem({ ...values });

    setSubmitting(false);
  },
})(StockForm);

export default CustomForm;
