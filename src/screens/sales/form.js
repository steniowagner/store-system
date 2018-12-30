// @flow

import React, { Component } from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import ProductSale from '../../components/common/product-sale-component';
import SaleConfirmation from '../../components/common/sale-confirmation';
import ActionFormButton from '../../components/common/ActionFormButton';
import { Section, Wrapper } from '../../components/common/FormUtils';

type Props = {
  onChageFormToEditMode: Function,
  setFieldValue: Function,
  handleSubmit: Function,
  onRemoveItem: Function,
  isSubmitting: boolean,
  stock: Array<Object>,
  values: Object,
  errors: Object,
  mode: string,
};

type State = {
  isSaleConfirmationDialogOpen: boolean,
};

class SalesForm extends Component<Props, State> {
  state = {
    isSaleConfirmationDialogOpen: false,
    shouldBlockFormSubmit: false,
  };

  onToggleSaleConfirmationDialog = (): void => {
    const { isSaleConfirmationDialogOpen } = this.state;

    this.setState({
      isSaleConfirmationDialogOpen: !isSaleConfirmationDialogOpen,
    });
  };

  handleBlockFormSubmit = (value: boolean): void => {
    this.setState({
      shouldBlockFormSubmit: value,
    });
  };

  renderProductSale = (): Object => {
    const {
      setFieldValue,
      stock,
      values,
      errors,
      mode,
    } = this.props;

    return (
      <Section>
        <ProductSale
          handleBlockFormSubmit={this.handleBlockFormSubmit}
          setFieldValue={setFieldValue}
          values={values}
          errors={errors}
          stock={stock}
          mode={mode}
        />
      </Section>
    );
  };

  renderSaleConfirmation = (): Object => {
    const { isSaleConfirmationDialogOpen } = this.state;
    const { values } = this.props;

    return (
      <SaleConfirmation
        onCloseDialog={this.onToggleSaleConfirmationDialog}
        isOpen={isSaleConfirmationDialogOpen}
        {...this.props}
        {...values}
      />
    );
  };

  renderActionFormButton = (): Object => {
    const {
      onChageFormToEditMode,
      onRemoveItem,
      isSubmitting,
      values,
      mode,
    } = this.props;

    const { shouldBlockFormSubmit } = this.state;

    const hasProducts = (values.products.length > 0);

    return (
      <ActionFormButton
        onClick={() => {
          if (!shouldBlockFormSubmit && hasProducts) {
            this.onToggleSaleConfirmationDialog();
          }
        }}
        onChageFormToEditMode={onChageFormToEditMode}
        onRemoveItem={onRemoveItem}
        disabled={isSubmitting || !hasProducts}
        mode={mode}
      />
    );
  };

  render() {
    return (
      <Wrapper>
        <Form>
          {this.renderProductSale()}
          {this.renderSaleConfirmation()}
          {this.renderActionFormButton()}
        </Form>
      </Wrapper>
    );
  }
}

const CustomForm = withFormik({
  mapPropsToValues: ({ item }) => ({
    paymentInfo: item.paymentInfo || {
      lastInputFocused: '',
      creditCardValue: '',
      debitCardValue: '',
      checkValue: '',
      moneyValue: '',
    },
    observation: item.observation || '',
    inDebit: item.inDebit || 0,
    discount: item.discount || {},
    customer: item.customer || '',
    products: item.products || [],
    subtotal: item.subtotal || 0,
    total: item.total || 0,
    code: item.code || '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    products: Yup.array()
      .required('At least one Product should be selected'),
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
