
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import CustomerFilter from './CustomerFilter';

const styles = {
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '80vh',
  },
};

type Props = {
  onSelectCustomer: Function,
  onToggle: Function,
  classes: Object,
  isOpen: boolean,
};

type State = {
  customer: Object,
};

class SelectCustomerDialog extends Component<Props, State> {
  state = {
    customer: {},
  };

  onChooseCustomer = (customer: Object) => {
    this.setState({
      customer,
    });
  };

  onOkPressed = (): void => {
    const { onSelectCustomer, onToggle } = this.props;
    const { customer } = this.state;

    onSelectCustomer(customer);
    onToggle();
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderDialog = (): Object => {
    const {
      customerSelected,
      customers,
      onToggle,
      classes,
      isOpen,
    } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        classes={{ paper: classes.dialogPaper }}
        TransitionComponent={this.renderSlide}
        disableBackdropClick
        onClose={onToggle}
        open={isOpen}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <CustomerFilter
            onChooseCustomer={this.onChooseCustomer}
            customerSelected={customerSelected}
            customers={customers}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onToggle}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => this.onOkPressed()}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    return this.renderDialog();
  }
}

export default withStyles(styles)(SelectCustomerDialog);
