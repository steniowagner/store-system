// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import ObservationItem from './components/ObservationItem';
import NewItemDialog from './components/NewItemDialog';
import DiscountItem from './components/DiscountItem';

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
  mode: string
};

type State = {
  isDialogOpen: boolean,
  dialogConfig: Object,
};

class FooterValues extends Component<Props, State> {
  state = {
    isDialogOpen: false,
    dialogConfig: {},
    observation: '',
    discount: {},
  };

  onSetDiscount = (value: string, type: string): void => {
    const discount = {
      value,
      type,
    };

    this.setState({
      discount,
    });
  };

  onSetObservation = (observation: string): void => {
    this.setState({
      observation,
    });
  };

  onRemoveDiscount = (): void => {
    this.setState({
      isDialogOpen: false,
      discount: {},
    });
  };

  onRemoveObservation = (): void => {
    this.setState({
      isDialogOpen: false,
      observation: '',
    });
  };

  onToggleDialog = (): void => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    });
  };

  onDiscoutButtonClicked = (): void => {
    const { discount } = this.state;

    const dialogConfig = {
      ChildrenComponent: DiscountItem,
      onCreateItem: (value, type) => this.onSetDiscount(value, type),
      onRemoveItem: () => this.onRemoveDiscount(),
      entity: 'Desconto',
      item: discount,
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

  renderDiscount = (): Object => {
    const { discount } = this.state;
    const { value, type } = discount;

    const discountText = (type === 'percentage' ? `(${value}%)` : `(R$ ${Number(value).toFixed(2)})`);
    const shouldShowDiscount = !!type;

    return shouldShowDiscount && (
      <DefaultText
        color="danger"
      >
        {`Desconto ${discountText}: R$ 21.90`}
      </DefaultText>
    );
  }

  renderSubtotal = (): Object => (
    <DefaultText
      color="mediumGray"
    >
      Sub-total: R$ 21.90
    </DefaultText>
  );

  renderTotal = (): Object => (
    <TotalText>
      Total: R$ 21.90
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

  renderButtons = (): Object => (
    <BottomRowWrapper>
      <ButtonsWrapper>
        {this.renderActionButton('observation', this.onObservationButtonClicked)}
        {this.renderActionButton('discount', this.onDiscoutButtonClicked)}
      </ButtonsWrapper>
      {this.renderTotal()}
    </BottomRowWrapper>
  );

  renderDialog = (): Object => {
    const { isDialogOpen, dialogConfig } = this.state;
    const { ChildrenComponent } = dialogConfig;

    const { mode } = this.props;

    return ChildrenComponent && (
      <NewItemDialog
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
        {this.renderButtons()}
        {this.renderDialog()}
      </Container>
    );
  }
}

export default FooterValues;
