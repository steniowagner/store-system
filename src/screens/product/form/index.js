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
    const barcodeInputFieldData = getRowItemObject('Barcode', 'Enter the Barcode', 'text', 'barcode');
    const descriptionInputFieldData = getRowItemObject('Description', 'Enter the Description', 'text', 'description');

    return renderRowWithTwoItems(barcodeInputFieldData, descriptionInputFieldData, this.props);
  };

  renderPrices = () => {
    const salePriceInputFieldData = getRowItemObject('Sale Price', 'Enter the Sale Price', 'number', 'salePrice');
    const costPriceInputFieldData = getRowItemObject('Cost Price', 'Enter the Cost Price', 'number', 'costPrice');

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

    const brandInputFieldData = getRowItemObject('Brand', 'Enter the Brand', 'text', 'brand');

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
      {renderSectionTitle('Product Info')}
      {this.renderBarcodeAndDescription()}
      {this.renderPrices()}
      {this.renderBrandRow()}
    </Section>
  );

  renderStockFields = () => {
    const stockQuantityInputFieldData = getRowItemObject('Quantity in Stock', 'Enter the Quantity in Stock', 'number', 'stockQuantity');
    const minQuantityStockInputFieldData = getRowItemObject('Min Quantity in Stock', 'Enter the Quantity in Stock', 'number', 'minStockQuantity');

    return renderRowWithTwoItems(stockQuantityInputFieldData, minQuantityStockInputFieldData, this.props);
  };

  renderStockSection = (): Object => (
    <Section>
      {renderSectionTitle('Stock')}
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
            entity="Product"
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
      .test('min-stock-quantity', 'Min Quantity greater than Stock Quantity.', () => {
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
        then: Yup.string().required('Min Stock Quantity is required.'),
      }),

    stockQuantity: Yup.string()
      .when('isCreateMode', {
        is: true,
        then: Yup.string().required('Stock Quantity is required.'),
      }),

    barcode: Yup.string()
      .test('barcode-repeated', 'This Barcode has already been registered.', (value) => {
        const { barcode } = item;
        return handleRepeatedFormValues(barcodesRegistered, barcode, value, mode);
      })
      .required('The Barcode is required.'),

    costPrice: Yup.string()
      .test('cost-price', 'Cost Price is required.', () => {
        const { salePrice, costPrice } = values;

        if (mode === 'edit') {
          return true;
        }

        const salePriceValue = (salePrice || 0);
        const costPriceValue = (costPrice || 0);

        return salePriceValue >= costPriceValue;
      })
      .required('Cost Price is required.'),

    salePrice: Yup.string()
      .required('Sale Price is required.'),

    description: Yup.string()
      .test('description-repeated', 'This Description has alreadyEsta Descrição já foi cadastrada.', (value) => {
        const { description } = item;
        return handleRepeatedFormValues(descriptionsRegistered, description, value, mode);
      })
      .required('The Description is required.'),

    brand: Yup.object()
      .test('brand-undefined', 'The Brand is required.', (value) => {
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
