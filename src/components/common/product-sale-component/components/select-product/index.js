// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import StockQuantityAlert, { ALERTS_TYPES } from './components/StockQuantityAlert';
import SelectProductsValues from './components/SelectProductsValues';
import ActionButtom from '../../../ActionButton';
import ProductFilter from './components/filter';

const Container = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-bottom: 2px solid ${({ theme }) => theme.colors.white};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: 8px;
  margin-left: 8px;
`;

type Props = {
  handleBlockFormSubmit: Function,
  onAddProduct: Function,
  stock: Array<Object>,
  values: Object,
  mode: string,
};

type State = {
  productSelected: Object,
  quantity: string,
};

class SelectProduct extends Component<Props, State> {
  state = {
    isAlertStockQuantityDialogOpen: false,
    refFocus: 'filterInput',
    productSelected: {},
    alertConfig: {},
    quantity: '',
  };

  onToggleAlertStockQuantityDialog = (): void => {
    const { isAlertStockQuantityDialogOpen } = this.state;

    this.setState({
      isAlertStockQuantityDialogOpen: !isAlertStockQuantityDialogOpen,
    });
  };

  onSelectProduct = (productSelected: Object): void => {
    this.setState({
      refFocus: 'quantity',
      productSelected,
    });
  };

  onTypeQuantity = (event: Object): void => {
    this.setState({
      quantity: event.target.value,
    });
  };

  onAddButtonClicked = (): void => {
    const { productSelected, quantity } = this.state;

    const resultingCheck = this.checkProductAvailabilityInStock(productSelected, quantity);

    if (typeof resultingCheck === 'boolean') {
      this.addProductOnList();
      return;
    }

    this.setState({
      isAlertStockQuantityDialogOpen: true,
      alertConfig: resultingCheck,
    });
  };

  addProductOnList = (): void => {
    const { productSelected, quantity } = this.state;
    const { onAddProduct } = this.props;

    this.setState({
      isAlertStockQuantityDialogOpen: false,
      refFocus: 'filterInput',
      productSelected: {},
      quantity: '',
    }, () => onAddProduct(productSelected, quantity));
  };

  checkProductAvailabilityInStock = (product: Object, quantityDesired: number): Object | boolean => {
    const { stock, values } = this.props;
    const { products } = values;

    const { stockQuantity, minStockQuantity } = stock.filter(productInStockInfo => productInStockInfo.ProductId === product.id)[0];

    const productAlreadyOnList = products.filter(productOnList => productOnList.id === product.id)[0];
    const totalQuantity = (productAlreadyOnList && productAlreadyOnList.quantity) || 0;

    const quantity = Number(quantityDesired) + totalQuantity;

    if (quantity > stockQuantity) {
      return {
        type: ALERTS_TYPES.STOCK_BELOW_MIN,
        stockInfo: {
          minStockQuantity,
          stockQuantity,
        },
        quantity,
      };
    }

    const newQuantity = stockQuantity - quantity;
    if (newQuantity < minStockQuantity) {
      return {
        type: ALERTS_TYPES.STOCK_WILL_BELOW_MIN,
        stockInfo: {
          minStockQuantity,
          stockQuantity,
        },
        quantity,
      };
    }

    return true;
  };

  renderAlertDialogQuantity = (): Object => {
    const {
      isAlertStockQuantityDialogOpen,
      productSelected,
      alertConfig,
      quantity,
    } = this.state;

    return (
      <StockQuantityAlert
        onCloseDialog={this.onToggleAlertStockQuantityDialog}
        isOpen={isAlertStockQuantityDialogOpen}
        onClickConfirm={this.addProductOnList}
        product={productSelected}
        alertConfig={alertConfig}
        quantity={quantity}
      />
    );
  };

  render() {
    const { productSelected, refFocus, quantity } = this.state;
    const { handleBlockFormSubmit, mode } = this.props;

    const isSomeProductSelected = !!(Object.entries(productSelected)).length;
    const isSomeQuantitySelected = !!(quantity);

    const shouldDisableButton = (!isSomeProductSelected || !isSomeQuantitySelected);

    return (
      <Container>
        <ProductFilter
          handleBlockFormSubmit={handleBlockFormSubmit}
          onSelectProduct={this.onSelectProduct}
          productSelected={productSelected}
          refFocus={refFocus}
          mode={mode}
        />
        <SelectProductsValues
          salePrice={productSelected.salePrice || ''}
          onTypeQuantity={this.onTypeQuantity}
          refFocus={refFocus}
          quantity={quantity}
          mode={mode}
        />
        <ButtonWrapper>
          <ActionButtom
            action={this.onAddButtonClicked}
            disabled={shouldDisableButton}
            withCustomInactiveColor
            title="Add"
          />
        </ButtonWrapper>
        {this.renderAlertDialogQuantity()}
      </Container>
    );
  }
}

export default SelectProduct;
