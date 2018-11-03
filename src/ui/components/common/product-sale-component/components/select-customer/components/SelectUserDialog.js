
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import CustomerFilter from './CustomerFilter';

const customers = [{
  name: 'Stenio Wagner Pereira de Freitas',
  cpf: '05482532348',
  rg: '12312312312312312',
  id: '11',
}, {
  name: 'Ana Eridan Pereira de Freitas',
  cpf: '',
  rg: '',
  id: '13',
}, {
  name: 'Manoel Elisval Pereira de Freitas',
  cpf: '9876',
  rg: '6789',
  id: '12',
}, {
  name: 'Beatriz Eliana Pereira de Freitas',
  cpf: '33333',
  rg: '44444444',
  id: '1',
}, {
  name: 'Sebastião Pereira da Silva',
  cpf: '33444555222',
  rg: '5451123444',
  id: '15',
}, {
  name: 'Francisca Pereira da Silva',
  cpf: '111222333',
  rg: '3333222111',
  id: '16666',
}];

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
            Cancelar
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
