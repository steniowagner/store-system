// @flow

import React from 'react';

import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Close from '@material-ui/icons/Clear';

import styled from 'styled-components';

import SaleForm from '../../../../sales/form';

const CloseIcon = styled(Close)`
  color: ${({ theme }) => theme.colors.white};
`;

const SaleDetailDialog = ({ isOpen, onToggleSaleDetailDialog }): Object => (
  <Dialog
    aria-describedby="alert-dialog-slide-description"
    aria-labelledby="alert-dialog-slide-title"
    onClose={onToggleSaleDetailDialog}
    disableBackdropClick
    open={isOpen}
    maxWidth="lg"
    fullWidth
  >
    <DialogContent>
      <Button
        onClick={onToggleSaleDetailDialog}
        aria-label="Close"
        color="primary"
        variant="fab"
      >
        <CloseIcon />
      </Button>
      <SaleForm
        onEditSaleOperation={() => {}}
        resetItemSelected={() => {}}
        item={{}}
        isOpen
      />
    </DialogContent>
  </Dialog>
);

export default SaleDetailDialog;
