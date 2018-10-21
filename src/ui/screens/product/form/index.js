import React, { Component } from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import ManufacturerAndBrandRow from './components/ManufacturerAndBrandRow';

import {
  SectionTitleWrapper,
  SectionTitle,
  Section,
  Wrapper,
  RowItem,
  Row,
} from '../../../components/common/FormUtils';

import ActionFormButton from '../../../components/common/ActionFormButton';
import Input from '../../../components/common/CustomInput';

type Props = {
  onChageFormToEditMode: Function,
  setFieldValue: Function,
  handleChange: Function,
  handleSubmit: Function,
  onRemoveItem: Function,
  handleBlur: Function,
  manufacturers: Object,
  touched: Object,
  brands: Object,
  values: Object,
  errors: Object,
  item: Object,
  isSubmitting: boolean,
  mode: string,
};

class ProductForm extends Component<Props, {}> {
  state = {
    brandsCreated: [],
  };

  onSubmitForm = (): void => {
    const { setFieldValue, handleSubmit } = this.props;
    const { brandsCreated } = this.state;

    setFieldValue('brandsCreated', brandsCreated);

    handleSubmit();
  };

  onCreateBrand = (brand: string): void => {
    const { brandsCreated } = this.state;

    this.setState({
      brandsCreated: [brand, ...brandsCreated],
    });
  };

  getRowItemObject = (label: string, placeholder: string, type: string, id: string): Object => ({
    placeholder,
    label,
    type,
    id,
  });

  renderSectionTitle = (title: string): Object => (
    <SectionTitleWrapper>
      <SectionTitle>
        {title}
      </SectionTitle>
    </SectionTitleWrapper>
  );

  renderRowWithTwoItems = (firstItem: Object, secondItem: Object): Object => {
    const {
      handleChange,
      handleBlur,
      touched,
      errors,
      values,
      mode,
    } = this.props;

    return (
      <Row>
        <RowItem>
          <Input
            error={touched[firstItem.id] && errors[firstItem.id]}
            placeholder={firstItem.placeholder}
            disabled={mode === 'visualize'}
            value={values[firstItem.id]}
            onChange={handleChange}
            label={firstItem.label}
            type={firstItem.type}
            onBlur={handleBlur}
            id={firstItem.id}
          />
        </RowItem>
        <RowItem>
          <Input
            error={touched[secondItem.id] && errors[secondItem.id]}
            placeholder={secondItem.placeholder}
            disabled={mode === 'visualize'}
            value={values[secondItem.id]}
            label={secondItem.label}
            onChange={handleChange}
            type={secondItem.type}
            onBlur={handleBlur}
            id={secondItem.id}
          />
        </RowItem>
      </Row>
    );
  };

  renderBarcodeAndDescription = (): void => {
    const barCodeInputFieldData = this.getRowItemObject('Código de Barras', 'Informe o Código de Barras do Produto', 'text', 'barCode');
    const descriptionInputFieldData = this.getRowItemObject('Descrição', 'Informe a Descrição do Produto', 'text', 'description');

    return this.renderRowWithTwoItems(barCodeInputFieldData, descriptionInputFieldData);
  };

  renderPrices = () => {
    const salePriceInputFieldData = this.getRowItemObject('Preço de Venda', 'Informe o Preço de Venda do Produto', 'number', 'salePrice');
    const costPriceInputFieldData = this.getRowItemObject('Preço de Custo', 'Informe o Preço de Custo do Produto', 'number', 'costPrice');

    return this.renderRowWithTwoItems(salePriceInputFieldData, costPriceInputFieldData);
  };

  renderProductInfoSection = (): Object => {
    const {
      setFieldValue,
      manufacturers,
      handleChange,
      handleBlur,
      brands,
      errors,
      values,
      item,
      mode,
    } = this.props;

    const { brandsCreated } = this.state;

    return (
      <Section>
        {this.renderSectionTitle('Informações do Produto')}
        {this.renderBarcodeAndDescription()}
        {this.renderPrices()}
        <ManufacturerAndBrandRow
          getRowItemObject={this.getRowItemObject}
          brands={[...brandsCreated, ...brands]}
          onCreateBrand={this.onCreateBrand}
          manufacturers={manufacturers}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          values={values}
          item={item}
          mode={mode}
        />
      </Section>
    );
  };

  renderStockFields = () => {
    const stockQuantityInputFieldData = this.getRowItemObject('Quantidade em Estoque', 'Informe a Quantidade em Estoque', 'number', 'stockQuantity');
    const minQuantityStockInputFieldData = this.getRowItemObject('Quantidade Mínima em Estoque', 'Informe a Quantidade Mínima do Produto no Estoque', 'number', 'minStockQuantity');

    return this.renderRowWithTwoItems(stockQuantityInputFieldData, minQuantityStockInputFieldData);
  };

  renderStockSection = (): Object => (
    <Section>
      {this.renderSectionTitle('Estoque')}
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
