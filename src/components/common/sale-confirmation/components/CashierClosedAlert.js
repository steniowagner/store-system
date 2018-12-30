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
      Cashier Closed
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        The Cashier is Closed. By this reason, it's not possible to move forward with the desired action.
        To perform this operation, open the Cashier.
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
