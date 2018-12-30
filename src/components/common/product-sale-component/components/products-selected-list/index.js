// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import EditQuantityDialog from './components/EditQuantityDialog';
import ProductListItem from './components/ProductListItem';

const Container = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: scroll;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.danger};
`;

type Props = {
  onEditProductQuantity: Function,
  onRemoveProduct: Function,
  products: Array<Object>,
  stock: Array<Object>,
  error: string,
  mode: string,
};

type State = {
  isEditQuantityDialogOpen: boolean,
  productSelectedIndex: number,
};

class ProductsSelectedList extends Component<Props, State> {
  state = {
    isEditQuantityDialogOpen: false,
    productSelectedIndex: '',
  };

  onEditButtonClicked = (productSelectedIndex: number): void => {
    this.setState({
      isEditQuantityDialogOpen: true,
      productSelectedIndex,
    });
  };

  onEditQuantity = (quantity: string): void => {
    const { onEditProductQuantity } = this.props;
    const { productSelectedIndex } = this.state;

    this.setState({
      isEditQuantityDialogOpen: false,
    }, () => onEditProductQuantity(productSelectedIndex, quantity));
  };

  onToggleEditQuantityDialog = (): void => {
    const { isEditQuantityDialogOpen } = this.state;

    this.setState({
      isEditQuantityDialogOpen: !isEditQuantityDialogOpen,
    });
  };

  renderList = (): Object => {
    const { onRemoveProduct, products, mode } = this.props;

    return (
      <Fragment>
        {products.map((product, index) => {
          const total = product.quantity * product.salePrice;

          return (
            <ProductListItem
              onEdit={this.onEditButtonClicked}
              onRemove={onRemoveProduct}
              total={total.toFixed(2)}
              key={product.id}
              index={index}
              {...product}
              mode={mode}
            />
          );
        })}
      </Fragment>
    );
  };

  renderEditQuantityDialog = (): Object => {
    const { productSelectedIndex, isEditQuantityDialogOpen } = this.state;
    const { products, stock } = this.props;

    const isInitialProductSelectedIndexValue = (typeof productSelectedIndex === 'string');
    const isProductListEmpty = !(products.length);

    if (isInitialProductSelectedIndexValue || isProductListEmpty) {
      return null;
    }

    const productSelected = products[productSelectedIndex];

    return (
      <EditQuantityDialog
        onCloseDialog={this.onToggleEditQuantityDialog}
        onEditQuantity={this.onEditQuantity}
        productSelected={productSelected}
        isOpen={isEditQuantityDialogOpen}
        stock={stock}
      />
    );
  };

  renderErrorMessage = (): Object => (
    <ErrorContainer>
      <ErrorMessage>
        At least one Product should be selected
      </ErrorMessage>
    </ErrorContainer>
  );

  render() {
    const { error } = this.props;

    return (
      <Container>
        {error ? this.renderErrorMessage() : this.renderList()}
        {this.renderEditQuantityDialog()}
      </Container>
    );
  }
}

export default ProductsSelectedList;
