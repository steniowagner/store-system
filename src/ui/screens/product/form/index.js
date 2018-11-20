// @flow

import React, { Component } from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import InputWithCreation from './components/InputWithCreation';

import {
  handleRepeatedFormValues,
  renderRowWithTwoItems,
  renderSectionTitle,
  getRowItemObject,
  Section,
  Wrapper,
  Row,
} from '../../../components/common/FormUtils';

import ActionFormButton from '../../../components/common/ActionFormButton';

type Props = {
  onChageFormToEditMode: Function,
  setFieldValue: Function,
  handleSubmit: Function,
  onRemoveItem: Function,
  brands: Array<any>,
  values: Object,
  errors: Object,
  item: Object,
  isSubmitting: boolean,
  mode: string,
};

class ProductForm extends Component<Props, {}> {
  state = {
    manufacturersCreated: [],
    brandsCreated: [],
  };

  onSubmitForm = (): void => {
    const { brandsCreated } = this.state;
    const { setFieldValue, handleSubmit } = this.props;

    setFieldValue('brandsCreated', brandsCreated);

    handleSubmit();
  };

  onCreateItem = (item: string, id: string): void => {
    const { state } = this;
    const dataset = state[id];

    this.setState({
      [id]: [item, ...dataset],
    });
  };

  renderBarcodeAndDescription = (): void => {
    const barcodeInputFieldData = getRowItemObject('Código de Barras', 'Informe o Código de Barras do Produto', 'text', 'barcode');
    const descriptionInputFieldData = getRowItemObject('Descrição', 'Informe a Descrição do Produto', 'text', 'description');

    return renderRowWithTwoItems(barcodeInputFieldData, descriptionInputFieldData, this.props);
  };

  renderPrices = () => {
    const salePriceInputFieldData = getRowItemObject('Preço de Venda', 'Informe o Preço de Venda do Produto', 'number', 'salePrice');
    const costPriceInputFieldData = getRowItemObject('Preço de Custo', 'Informe o Preço de Custo do Produto', 'number', 'costPrice');

    return renderRowWithTwoItems(salePriceInputFieldData, costPriceInputFieldData, this.props);
  };

  renderInputWithCreation = (data: Object): Object => {
    const {
      setFieldValue,
      errors,
      values,
      item,
      mode,
    } = this.props;

    const {
      datasetCreatedId,
      datasetCreated,
      fieldData,
      dataset,
    } = data;

    return (
      <InputWithCreation
        onCreateItem={(newItem: string): void => this.onCreateItem(newItem, datasetCreatedId)}
        dataset={[...datasetCreated, ...dataset]}
        setFieldValue={setFieldValue}
        fieldData={fieldData}
        errors={errors}
        values={values}
        item={item}
        mode={mode}
        id={fieldData.id}
      />
    );
  };

  renderBrandRow = (): Object => {
    const { brandsCreated } = this.state;
    const { brands } = this.props;

    const brandInputFieldData = getRowItemObject('Marca', 'Informe a Marca do Produto', 'text', 'brand');

    const brandData = {
      datasetCreatedId: 'brandsCreated',
      fieldData: brandInputFieldData,
      datasetCreated: brandsCreated,
      dataset: brands,
    };

    return (
      <Row>
        {this.renderInputWithCreation(brandData)}
      </Row>
    );
  };

  renderProductInfoSection = (): Object => (
    <Section>
      {renderSectionTitle('Informações do Produto')}
      {this.renderBarcodeAndDescription()}
      {this.renderPrices()}
      {this.renderBrandRow()}
    </Section>
  );

  renderStockFields = () => {
    const stockQuantityInputFieldData = getRowItemObject('Quantidade em Estoque', 'Informe a Quantidade em Estoque', 'number', 'stockQuantity');
    const minQuantityStockInputFieldData = getRowItemObject('Quantidade Mínima em Estoque', 'Informe a Quantidade Mínima do Produto no Estoque', 'number', 'minStockQuantity');

    return renderRowWithTwoItems(stockQuantityInputFieldData, minQuantityStockInputFieldData, this.props);
  };

  renderStockSection = (): Object => (
    <Section>
      {renderSectionTitle('Estoque')}
      {this.renderStockFields()}
    </Section>
  );

  render() {
    const {
      onChageFormToEditMode,
      isSubmitting,
      onRemoveItem,
      mode,
    } = this.props;

    return (
      <Wrapper>
        <Form>
          {this.renderProductInfoSection()}
          {(mode === 'create') && this.renderStockSection()}
          <ActionFormButton
            onChageFormToEditMode={onChageFormToEditMode}
            onClick={this.onSubmitForm}
            onRemoveItem={onRemoveItem}
            disabled={isSubmitting}
            entity="Produto"
            canBeRemoved
            mode={mode}
          />
        </Form>
      </Wrapper>
    );
  }
}

const CustomForm = withFormik({
  mapPropsToValues: ({ item, mode }) => ({
    brand: (mode === 'edit' || mode === 'detail')
      ? { name: item.brand.name, id: item.brand.id }
      : { name: '', id: '' },
    isCreateMode: (mode === 'create'),
    minStockQuantity: item.minStockQuantity || '',
    stockQuantity: item.stockQuantity || '',
    description: item.description || '',
    costPrice: item.costPrice || '',
    salePrice: item.salePrice || '',
    barcode: item.barcode || '',
  }),

  validationSchema: ({
    descriptionsRegistered,
    barcodesRegistered,
    item,
    mode,
  }) => Yup.lazy(values => Yup.object().shape({
    isCreateMode: Yup.boolean(),

    minStockQuantity: Yup.string()
      .test('min-stock-quantity', 'Quantidade Mínima Maior que a em Estoque.', () => {
        const { minStockQuantity, stockQuantity } = values;

        if (mode === 'edit') {
          return true;
        }

        const minStockQuantityValue = (minStockQuantity || 0);
        const stockQuantityValue = (stockQuantity || 0);

        return minStockQuantityValue <= stockQuantityValue;
      })
      .when('isCreateMode', {
        is: true,
        then: Yup.string().required('A Quantidade Mínima em Estoque é Obrigatória.'),
      }),

    stockQuantity: Yup.string()
      .when('isCreateMode', {
        is: true,
        then: Yup.string().required('A Quantidade em Estoque é Obrigatória.'),
      }),

    barcode: Yup.string()
      .test('barcode-repeated', 'Este Código já foi cadastrado.', (value) => {
        const { barcode } = item;
        return handleRepeatedFormValues(barcodesRegistered, barcode, value, mode);
      })
      .required('O Código de Barras é obrigatório.'),

    costPrice: Yup.string()
      .test('cost-price', 'Preço de Custo Maior que Preço de Venda.', () => {
        const { salePrice, costPrice } = values;

        if (mode === 'edit') {
          return true;
        }

        const salePriceValue = (salePrice || 0);
        const costPriceValue = (costPrice || 0);

        return salePriceValue >= costPriceValue;
      })
      .required('O Preço de Custo é obrigatório.'),

    salePrice: Yup.string()
      .required('O Preço de Venda é obrigatório.'),

    description: Yup.string()
      .test('description-repeated', 'Esta Descrição já foi cadastrada.', (value) => {
        const { description } = item;
        return handleRepeatedFormValues(descriptionsRegistered, description, value, mode);
      })
      .required('A Descrição é obrigatória.'),

    brand: Yup.object()
      .test('brand-undefined', 'A Marca é obrigatória.', (value) => {
        const { name } = value;
        return !!name;
      }),
  })),

  handleSubmit(values, { setSubmitting, props }) {
    const { onCreateItem, onEditItem, mode } = props;

    const properCallback = (mode === 'edit' ? onEditItem : onCreateItem);

    properCallback({
      ...values,
    });

    setSubmitting(false);
  },
})(ProductForm);

export default CustomForm;
