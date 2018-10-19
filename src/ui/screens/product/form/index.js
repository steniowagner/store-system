import React, { Component } from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import DialogChooseItem from './components/DialogChooseItem';

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
  handleChange: Function,
  handleSubmit: Function,
  onRemoveItem: Function,
  handleBlur: Function,
  manufacturers: Object,
  touched: Object,
  brands: Object,
  values: Object,
  errors: Object,
  isSubmitting: boolean,
  mode: string,
};

class ProductForm extends Component<Props, {}> {
  state = {
    isDialogChooseItemOpen: true,
    manufacturerSelected: '',
    brandSelected: '',
  };

  onToggleDialogChooseItem = (): void => {
    const { isDialogChooseItemOpen } = this.state;

    this.setState({
      isDialogChooseItemOpen: !isDialogChooseItemOpen,
    });
  };

  onSelectManufacturer = (manufacturerSelected: Object): void => {
    this.setState({
      manufacturerSelected,
    });
  };

  onSelectBrand = (brandSelected: string): void => {
    this.setState({
      brandSelected,
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

  renderRowWithTwoItems = (firstItem: Object, secondItem: Object) => {
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
            label={firstItem.label}
            type={firstItem.type}
            id={firstItem.id}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </RowItem>
        <RowItem>
          <Input
            error={touched[secondItem.id] && errors[secondItem.id]}
            placeholder={secondItem.placeholder}
            disabled={mode === 'visualize'}
            value={values[secondItem.id]}
            label={secondItem.label}
            type={secondItem.type}
            id={secondItem.id}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </RowItem>
      </Row>
    );
  };

  renderBarcodeAndDescription = () => {
    const barCode = this.getRowItemObject('Código de Barras', 'Informe o Código de Barras do Produto', 'text', 'barCode');
    const description = this.getRowItemObject('Descrição', 'Informe a Descrição do Produto', 'text', 'description');

    return this.renderRowWithTwoItems(barCode, description);
  };

  renderPrices = () => {
    const salePrice = this.getRowItemObject('Preço de Venda', 'Informe o Preço de Venda do Produto', 'number', 'salePrice');
    const costPrice = this.getRowItemObject('Preço de Custo', 'Informe o Preço de Custo do Produto', 'number', 'costPrice');

    return this.renderRowWithTwoItems(salePrice, costPrice);
  };

  renderProductInfoSection = (): Object => {
    const { isDialogChooseItemOpen } = this.state;
    const { brands, manufacturers } = this.props;

    return (
      <Section>
        {this.renderSectionTitle('Informações do Produto')}
        {this.renderBarcodeAndDescription()}
        {this.renderPrices()}
        <DialogChooseItem
          onToggleDialog={this.onToggleDialogChooseItem}
          isOpen={isDialogChooseItemOpen}
          manufacturers={manufacturers}
          brands={brands}
        />
      </Section>
    );
  }

  renderStockFields = () => {
    const stockQuantity = this.getRowItemObject('Quantidade em Estoque', 'Informe a Quantidade em Estoque', 'number', 'stockQuantity');
    const minQuantityStock = this.getRowItemObject('Quantidade Mínima em Estoque', 'Informe a Quantidade Mínima do Produto no Estoque', 'number', 'minStockQuantity');

    return this.renderRowWithTwoItems(stockQuantity, minQuantityStock);
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
      handleSubmit,
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
            onRemoveItem={onRemoveItem}
            disabled={isSubmitting}
            onClick={handleSubmit}
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
    description: item.description || '',
    costPrice: item.costPrice || '',
    salePrice: item.salePrice || '',
    barCode: item.barCode || '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    minStockQuantity: Yup.string()
      .required('A Quantidade Mínima em Estoque é obrigatória.'),

    stockQuantity: Yup.string()
      .required('A Quantidade em Estoque é obrigatória.'),

    costPrice: Yup.string()
      .required('O Preço de Custo é obrigatório.'),

    salePrice: Yup.string()
      .required('O Preço de Venda é obrigatório.'),

    description: Yup.string()
      .required('A Descrição é obrigatório.'),

    barCode: Yup.string()
      .required('O Código de Barras é obrigatório.'),
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
