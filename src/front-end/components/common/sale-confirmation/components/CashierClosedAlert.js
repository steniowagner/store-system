// @flow

import React, { Fragment } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

type Props = {
  onCloseDialog: Function,
};

const CashierClosedAlert = ({ onCloseDialog }: Props): Object => (
  <Fragment>
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      Caixa Fechado
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        O Caixa encontra-se fechado. Por esse motivo, não é possível prosseguir com a ação desejada.
        Para realizar esta operação, abra o Caixa.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onCloseDialog}
        color="primary"
      >
        OK
      </Button>
    </DialogActions>
  </Fragment>
);

export default CashierClosedAlert;
