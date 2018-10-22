// @flow

import React, { Component } from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import InputWithCreation from './components/InputWithCreation';

import {
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
  manufacturers: Array<any>,
  categories: Array<any>,
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
    categoriesCreated: [],
    brandsCreated: [],
  };

  onSubmitForm = (): void => {
    const { manufacturersCreated, categoriesCreated, brandsCreated } = this.state;
    const { setFieldValue, handleSubmit } = this.props;

    setFieldValue('manufacturersCreated', manufacturersCreated);
    setFieldValue('categoriesCreated', categoriesCreated);
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
    const barCodeInputFieldData = getRowItemObject('Código de Barras', 'Informe o Código de Barras do Produto', 'text', 'barCode');
    const descriptionInputFieldData = getRowItemObject('Descrição', 'Informe a Descrição do Produto', 'text', 'description');

    return renderRowWithTwoItems(barCodeInputFieldData, descriptionInputFieldData, this.props);
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

  renderManufacturerInputItem = () => {
    const { manufacturersCreated } = this.state;
    const { manufacturers } = this.props;

    const manufacturerInputFieldData = getRowItemObject('Fabricante', 'Informe o Fabricante do Produto', 'text', 'manufacturer');

    const manufacturerData = {
      datasetCreatedId: 'manufacturersCreated',
      fieldData: manufacturerInputFieldData,
      datasetCreated: manufacturersCreated,
      dataset: manufacturers,
    };

    return (
      <Row>
        {this.renderInputWithCreation(manufacturerData)}
      </Row>
    );
  };

  renderCategoryAndBrandRow = (): Object => {
    const { brandsCreated, categoriesCreated } = this.state;
    const { categories, brands } = this.props;

    const categorieInputFieldData = getRowItemObject('Categoria', 'Informe a Categoria do Produto', 'text', 'category');
    const brandInputFieldData = getRowItemObject('Marca', 'Informe a Marca do Produto', 'text', 'brand');

    const categoryData = {
      datasetCreatedId: 'categoriesCreated',
      fieldData: categorieInputFieldData,
      datasetCreated: categoriesCreated,
      dataset: categories,
    };

    const brandData = {
      datasetCreatedId: 'brandsCreated',
      fieldData: brandInputFieldData,
      datasetCreated: brandsCreated,
      dataset: brands,
    };

    return (
      <Row>
        {this.renderInputWithCreation(categoryData)}
        {this.renderInputWithCreation(brandData)}
      </Row>
    );
  };

  renderProductInfoSection = (): Object => (
    <Section>
      {renderSectionTitle('Informações do Produto')}
      {this.renderBarcodeAndDescription()}
      {this.renderPrices()}
      {this.renderCategoryAndBrandRow()}
      {this.renderManufacturerInputItem()}
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
          {this.renderStockSection()}
          <ActionFormButton
            onChageFormToEditMode={onChageFormToEditMode}
            onClick={this.onSubmitForm}
            onRemoveItem={onRemoveItem}
            disabled={isSubmitting}
            mode={mode}
          />
        </Form>
      </Wrapper>
    );
  }
}

const CustomForm = withFormik({
  mapPropsToValues: ({ item }) => ({
    minStockQuantity: item.minStockQuantity || '',
    stockQuantity: item.stockQuantity || '',
    manufacturer: item.manufacturer || '',
    description: item.description || '',
    costPrice: item.costPrice || '',
    salePrice: item.salePrice || '',
    category: item.category || '',
    barCode: item.barCode || '',
    brand: item.brand || '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    minStockQuantity: Yup.string()
      .required('A Quantidade Mínima em Estoque é obrigatória.'),

    stockQuantity: Yup.string()
      .required('A Quantidade em Estoque é obrigatória.'),

    barCode: Yup.string()
      .required('O Código de Barras é obrigatório.'),

    costPrice: Yup.string()
      .required('O Preço de Custo é obrigatório.'),

    salePrice: Yup.string()
      .required('O Preço de Venda é obrigatório.'),

    manufacturer: Yup.string()
      .required('O Fabricante é obrigatório.'),

    category: Yup.string()
      .required('A Categoria é obrigatória.'),

    description: Yup.string()
      .required('A Descrição é obrigatório.'),

    brand: Yup.string()
      .required('A Marca é obrigatória.'),
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
