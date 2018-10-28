// @flow

import React, { Component } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import Input from '../../../../CustomInput';

type Props = {
  onEditQuantity: Function,
  quantity: number,
};

type State = {
  quantity: string,
};

class EditQuantityDialog extends Component<Props, State> {
  state = {
    quantity: '',
  };

  componentDidMount() {
    const { quantity } = this.props;

    this.setState({
      quantity,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      quantity: nextProps.quantity,
    });
  }

  onTypeQuantity = (quantity: string): void => {
    this.setState({
      quantity,
    });
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
      Editar Quantidade
    </DialogTitle>
  );

  renderInput = (): Object => {
    const { quantity } = this.state;

    return (
      <DialogContent>
        <Input
          onChange={event => this.onTypeQuantity(event.target.value)}
          onBlur={() => {}}
          id="editQuantity"
          disabled={false}
          value={quantity}
          placeholder=""
          type="number"
          error=""
        />
      </DialogContent>
    );
  };

  renderActionButtons = (): Object => {
    const { onEditQuantity, onCloseDialog } = this.props;
    const { quantity } = this.state;

    return (
      <DialogActions>
        <Button
          onClick={onCloseDialog}
          color="primary"
        >
          CANCELAR
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
      >
        {this.renderTitle()}
        {this.renderInput()}
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default EditQuantityDialog;
