// @flow

import React, { Component } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

import Input from '../../../../CustomInput';

const StockAlert = styled.div`
  margin-top: 16px;
`;

const WarningText = styled.p`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkText};
`;

type Props = {
  onEditQuantity: Function,
  productSelected: Object,
  stock: Array<Object>,
};

type State = {
  productAvailabilityMessage: string,
  quantity: string,
};

class EditQuantityDialog extends Component<Props, State> {
  state = {
    productAvailabilityMessage: '',
    quantity: '',
  };

  componentDidMount() {
    const { productSelected } = this.props;
    const { quantity } = productSelected;

    this.setState({
      quantity,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { productSelected } = nextProps;
    const { quantity } = productSelected;

    this.setState({
      quantity,
    });
  }

  onTypeQuantity = (quantity: string): void => {
    const productAvailabilityMessage = this.handleProductAvailabilityInStock(quantity);

    this.setState({
      productAvailabilityMessage,
      quantity,
    });
  };

  resetStockError = (): void => {
    this.setState({
      productAvailabilityMessage: '',
    });
  };

  handleProductAvailabilityInStock = (quantity: string): string => {
    const { productSelected, stock } = this.props;

    const { stockQuantity, minStockQuantity } = stock.filter(productInStockInfo => productInStockInfo.ProductId === productSelected.id)[0];

    if (Number(quantity) > stockQuantity) {
      return 'The Stock hasn\'s the desire quantity. By performing this operation, the Stock will be negative.';
    }

    const newQuantity = stockQuantity - Number(quantity);
    if (newQuantity < minStockQuantity) {
      return 'By performing this edition, the Stock of this Product will be below the minimium.';
    }

    return '';
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderTitle = (): Object => (
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      Edit Quantity
    </DialogTitle>
  );

  renderInput = (): Object => {
    const { quantity } = this.state;

    return (
      <Input
        onChange={event => this.onTypeQuantity(event.target.value)}
        onBlur={() => {}}
        id="editQuantity"
        disabled={false}
        value={quantity}
        placeholder=""
        type="number"
        autoFocus
        error=""
      />
    );
  };

  renderStockError = (): Object => {
    const { productAvailabilityMessage } = this.state;

    return !!productAvailabilityMessage && (
      <StockAlert>
        <WarningText>
          Warning
        </WarningText>
        <DialogContentText
          id="alert-dialog-slide-description"
        >
          {productAvailabilityMessage}
        </DialogContentText>
      </StockAlert>
    );
  };

  renderActionButtons = (): Object => {
    const { onEditQuantity, onCloseDialog } = this.props;
    const { quantity } = this.state;

    return (
      <DialogActions>
        <Button
          onClick={() => {
            this.resetStockError();
            onCloseDialog();
          }}
          color="primary"
        >
          CANCEL
        </Button>
        <Button
          onClick={() => onEditQuantity(Math.abs(quantity))}
          disabled={!quantity}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    );
  };

  render() {
    const { onCloseDialog, isOpen } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={onCloseDialog}
        keepMounted={false}
        open={isOpen}
        maxWidth="xs"
        fullWidth
      >
        {this.renderTitle()}
        <DialogContent>
          {this.renderInput()}
          {this.renderStockError()}
        </DialogContent>
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default EditQuantityDialog;
