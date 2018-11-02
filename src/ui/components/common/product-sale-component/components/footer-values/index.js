// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import ObservationItem from './components/ObservationItem';
import CreateItemDialog from './components/CreateItemDialog';
import DiscountItem from './components/DiscountItem';

import { getDiscountByPercentage, calculateSubtotalValue, calculateTotalValue } from './calculateValues';

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
  products: Array<Object>,
  mode: string
};

type State = {
  dialogConfig: Object,
  discount: Object,
  isDialogOpen: boolean,
  observation: string,
};

class FooterValues extends Component<Props, State> {
  state = {
    isDialogOpen: false,
    dialogConfig: {},
    observation: '',
    discount: {},
  };

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps;
    const isProductListEmpty = !(products.length);

    if (isProductListEmpty) {
      this.setState({
        discount: {},
      });
    }
  }

  onSetDiscount = (value: string, type: string): void => {
    const { setFieldValue } = this.props;

    const discount = {
      value,
      type,
    };

    this.setState({
      discount,
    }, () => setFieldValue('discount', discount));
  };

  onSetObservation = (observation: string): void => {
    const { setFieldValue } = this.props;

    this.setState({
      observation,
    }, () => setFieldValue('observation', observation));
  };

  onRemoveDiscount = (): void => {
    const { setFieldValue } = this.props;

    this.setState({
      isDialogOpen: false,
      discount: {},
    }, () => setFieldValue('discount', {}));
  };

  onRemoveObservation = (): void => {
    const { setFieldValue } = this.props;

    this.setState({
      isDialogOpen: false,
      observation: '',
    }, () => setFieldValue('observation', ''));
  };

  onToggleDialog = (): void => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    });
  };

  onDiscoutButtonClicked = (subTotal: number): void => {
    const { discount } = this.state;

    const total = calculateTotalValue(subTotal);

    const dialogConfig = {
      ChildrenComponent: DiscountItem,
      onCreateItem: (value, type) => this.onSetDiscount(value, type),
      onRemoveItem: () => this.onRemoveDiscount(),
      entity: 'Desconto',
      item: discount,
      total,
    };

    this.setState({
      isDialogOpen: true,
      dialogConfig,
    });
  };

  onObservationButtonClicked = (): void => {
    const { observation } = this.state;

    const dialogConfig = {
      ChildrenComponent: ObservationItem,
      onCreateItem: value => this.onSetObservation(value),
      onRemoveItem: () => this.onRemoveObservation(),
      entity: 'Observação',
      item: observation,
    };

    this.setState({
      isDialogOpen: true,
      dialogConfig,
    });
  };

  getDiscountMoneyText = (value: number): string => `Desconto: R$ ${value.toFixed(2)}`;

  getDiscountPercentageText = (subTotal: number, value: number): string => {
    const subTotalInPercentage = getDiscountByPercentage(subTotal, value);

    return `Desconto (${value}%): R$ ${subTotalInPercentage.toFixed(2)}`;
  };

  renderDiscount = (subTotal: number): Object => {
    const { discount } = this.state;
    const { value, type } = discount;
    const shouldShowDiscount = (!!type && !!value);

    let discountText = '';

    if (shouldShowDiscount) {
      discountText = (type === 'percentage'
        ? this.getDiscountPercentageText(subTotal, Number(value))
        : this.getDiscountMoneyText(Number(value)));
    }

    return shouldShowDiscount && (
      <DefaultText
        color="danger"
      >
        {discountText}
      </DefaultText>
    );
  }

  renderSubtotal = (subTotal: number): Object => (
    <DefaultText
      color="mediumGray"
    >
      {`Sub-total: R$ ${subTotal.toFixed(2)}`}
    </DefaultText>
  );

  renderTotal = (total: number): Object => (
    <TotalText>
      {`Total: R$ ${total.toFixed(2)}`}
    </TotalText>
  );

  renderActionButton = (id: string, action: Function): Object => {
    const { mode } = this.props;
    const { state } = this;

    const isOnEditMode = (mode === 'edit');

    const title = {
      observation: ((isOnEditMode || !!state.observation) ? 'Editar Observação' : 'Adicionar Observação'),
      discount: ((isOnEditMode || !!state.discount.type) ? 'Editar Desconto' : 'Adicionar Desconto'),
    };

    return (
      <ButtonWrapper>
        <ActionButton
          title={title[id]}
          action={action}
        />
      </ButtonWrapper>
    );
  }

  renderBottomRow = (total: number, subTotal: number): Object => (
    <BottomRowWrapper>
      {this.renderButtons(subTotal)}
      {this.renderTotal(total)}
    </BottomRowWrapper>
  );

  renderButtons = (subTotal: number): Object => (
    <ButtonsWrapper>
      {this.renderActionButton('observation', this.onObservationButtonClicked)}
      {this.renderActionButton('discount', () => this.onDiscoutButtonClicked(subTotal))}
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
    const { discount } = this.state;
    const { products } = this.props;

    const subTotal = calculateSubtotalValue(products);
    const total = calculateTotalValue(discount, subTotal);

    return (
      <Container>
        {this.renderSubtotal(subTotal)}
        {this.renderDiscount(subTotal)}
        {this.renderBottomRow(total, subTotal)}
        {this.renderDialog()}
      </Container>
    );
  }
}

export default FooterValues;
