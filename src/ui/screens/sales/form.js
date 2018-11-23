// @flow

import React, { Component } from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import ProductSale from '../../components/common/product-sale-component';
import ActionFormButton from '../../components/common/ActionFormButton';
import SaleConfirmation from '../../components/common/sale-confirmation';
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
  };

  onToggleSaleConfirmationDialog = (): void => {
    const { isSaleConfirmationDialogOpen } = this.state;

    this.setState({
      isSaleConfirmationDialogOpen: !isSaleConfirmationDialogOpen,
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

    const {
      setFieldValue,
      handleSubmit,
      isSubmitting,
      values,
      mode,
    } = this.props;

    const {
      paymentInfo,
      isInDebit,
      discount,
      subtotal,
      total,
    } = values;

    return (
      <SaleConfirmation
        onCloseDialog={this.onToggleSaleConfirmationDialog}
        isOpen={isSaleConfirmationDialogOpen}
        setFieldValue={setFieldValue}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        paymentInfo={paymentInfo}
        isInDebit={isInDebit}
        discount={discount}
        subtotal={subtotal}
        total={total}
        mode={mode}
      />
    );
  };

  renderActionFormButton = (): Object => {
    const {
      onChageFormToEditMode,
      onRemoveItem,
      values,
      mode,
    } = this.props;

    const { products } = values;
    const hasProducts = !!(products.length);

    return (
      <ActionFormButton
        onClick={this.onToggleSaleConfirmationDialog}
        onChageFormToEditMode={onChageFormToEditMode}
        onRemoveItem={onRemoveItem}
        disabled={!hasProducts}
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
    isInDebit: item.isInDebit || false,
    discount: item.discount || {},
    customer: item.customer || '',
    products: item.products || [],
    subtotal: item.subtotal || 0,
    total: item.total || 0,
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    products: Yup.array()
      .required('Ao menos um Produto deve ser Adicionado'),
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
