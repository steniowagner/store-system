// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import ObservationItem from './components/ObservationItem';
import CreateItemDialog from './components/CreateItemDialog';
import DiscountItem from './components/DiscountItem';

import { getDiscountByPercentage } from '../../calculateValues';

import ActionButton from '../../../ActionButton';

const Container = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-top: 2px solid ${({ theme }) => theme.colors.white};
`;

const TotalText = styled.h1`
  font-size: 42px;
  color: ${({ theme }) => theme.colors.darkText};
`;

const DefaultText = styled.h3`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 24px;
  color: ${({ theme, color }) => theme.colors[color]};
`;

const BottomRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  margin-right: 16px;
`;

type Props = {
  setFieldValue: Function,
  setSaleValues: Function,
  products: Array<Object>,
  observation: string,
  discount: Object,
  subtotal: number,
  total: number,
  mode: string,
};

type State = {
  dialogConfig: Object,
  isDialogOpen: boolean,
};

class FooterValues extends Component<Props, State> {
  state = {
    isDialogOpen: false,
    dialogConfig: {},
  };

  onSetDiscount = (value: string, type: string): void => {
    const { products, setFieldValue, setSaleValues } = this.props;

    const discount = {
      value,
      type,
    };

    setFieldValue('discount', discount);
    setSaleValues(products, setFieldValue, discount);
  };

  onSetObservation = (observation: string): void => {
    const { setFieldValue } = this.props;

    setFieldValue('observation', observation);
  };

  onRemoveDiscount = (): void => {
    const { products, setFieldValue, setSaleValues } = this.props;

    this.setState({
      isDialogOpen: false,
    }, () => {
      setSaleValues(products, setFieldValue, {});
      setFieldValue('discount', {});
    });
  };

  onRemoveObservation = (): void => {
    const { setFieldValue } = this.props;

    this.setState({
      isDialogOpen: false,
    }, () => setFieldValue('observation', ''));
  };

  onToggleDialog = (): void => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    });
  };

  onDiscoutButtonClicked = (): void => {
    const { discount, total, mode } = this.props;

    const hasDiscount = (typeof discount === 'object' ? !!discount.type : !!discount);
    const isFormInEditonMode = (mode === 'edit');
    const isOnEditionMode = ((isFormInEditonMode && hasDiscount) || hasDiscount);

    const dialogConfig = {
      ChildrenComponent: DiscountItem,
      onCreateItem: (value, type) => this.onSetDiscount(value, type),
      onRemoveItem: () => this.onRemoveDiscount(),
      entity: 'Discount',
      isOnEditionMode,
      item: discount,
      total,
    };

    this.setState({
      isDialogOpen: true,
      dialogConfig,
    });
  };

  onObservationButtonClicked = (): void => {
    const { observation, mode } = this.props;

    const isFormInEditonMode = (mode === 'edit');
    const isOnEditionMode = ((isFormInEditonMode && !!observation) || !!observation);

    const dialogConfig = {
      ChildrenComponent: ObservationItem,
      onCreateItem: value => this.onSetObservation(value),
      onRemoveItem: () => this.onRemoveObservation(),
      entity: 'Observation',
      isOnEditionMode,
      item: observation,
    };

    this.setState({
      isDialogOpen: true,
      dialogConfig,
    });
  };

  getDiscountByMoneyText = (value: number): string => `Discount: $ ${value.toFixed(2)}`;

  getDiscountByPercentageText = (subtotal: number, value: number): string => {
    const subtotalInPercentage = getDiscountByPercentage(subtotal, value);

    return `Discount (${value}%): $ ${subtotalInPercentage.toFixed(2)}`;
  };

  renderDiscount = (): Object => {
    const { discount, subtotal } = this.props;
    const { value, type } = discount;

    const hasDiscount = (!!value && !!type);

    if (!hasDiscount) {
      return null;
    }

    const discountText = (type === 'percentage'
      ? this.getDiscountByPercentageText(subtotal, value)
      : this.getDiscountByMoneyText(value));

    return (
      <DefaultText
        color="danger"
      >
        {discountText}
      </DefaultText>
    );
  }

  renderSubtotal = (): Object => {
    const { subtotal } = this.props;

    return (
      <DefaultText
        color="mediumGray"
      >
        {`Sub-total: $ ${subtotal.toFixed(2)}`}
      </DefaultText>
    );
  };

  renderTotal = (total: number): Object => (
    <TotalText>
      {`Total: $ ${total.toFixed(2)}`}
    </TotalText>
  );

  renderActionButton = (id: string, action: Function): Object => {
    const {
      observation,
      products,
      discount,
      mode,
    } = this.props;

    const isDisabled = (id === 'discount' && !products.length) || mode === 'detail';
    const isOnEditMode = (mode === 'edit');

    const title = {
      observation: (((isOnEditMode && !!observation) || !!observation) ? 'Edit Observation' : 'Add Observation'),
      discount: (((isOnEditMode && !!discount.type) || !!discount.type) ? 'Edit Discount' : 'Add Discount'),
    };

    return (
      <ButtonWrapper>
        <ActionButton
          withCustomInactiveColor={isDisabled}
          disabled={isDisabled}
          title={title[id]}
          action={action}
        />
      </ButtonWrapper>
    );
  }

  renderBottomRow = (): Object => {
    const { subtotal, total } = this.props;

    return (
      <BottomRowWrapper>
        {this.renderButtons(subtotal)}
        {this.renderTotal(total)}
      </BottomRowWrapper>
    );
  };

  renderButtons = (subtotal: number): Object => (
    <ButtonsWrapper>
      {this.renderActionButton('observation', this.onObservationButtonClicked)}
      {this.renderActionButton('discount', () => this.onDiscoutButtonClicked(subtotal))}
    </ButtonsWrapper>
  );

  renderDialog = (): Object => {
    const { isDialogOpen, dialogConfig } = this.state;
    const { ChildrenComponent } = dialogConfig;

    const { mode } = this.props;

    return ChildrenComponent && (
      <CreateItemDialog
        onCloseDialog={this.onToggleDialog}
        isOpen={isDialogOpen}
        {...dialogConfig}
        mode={mode}
      />
    );
  };

  render() {
    return (
      <Container>
        {this.renderSubtotal()}
        {this.renderDiscount()}
        {this.renderBottomRow()}
        {this.renderDialog()}
      </Container>
    );
  }
}

export default FooterValues;
