import React from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

type Props = {
  positiveAction: Function,
  negativeAction: Function,
  onCloseDialog: Function,
  positiveText: string,
  negativeText: string,
  description: string,
  isOpen: boolean,
  title: string,
};

const onActionButtonClicked = (action: Function, onCloseDialog: Function): Object => {
  action();
  onCloseDialog();
};

const renderSlide = (props: Object): Object => (
  <Slide
    direction="up"
    {...props}
  />
);

const CustomDialog = ({
  positiveAction,
  negativeAction,
  onCloseDialog,
  positiveText,
  negativeText,
  description,
  title,
  isOpen,
}: Props): Object => (
  <Dialog
    aria-describedby="alert-dialog-slide-description"
    aria-labelledby="alert-dialog-slide-title"
    TransitionComponent={renderSlide}
    onClose={onCloseDialog}
    disableBackdropClick
    open={isOpen}
    keepMounted
  >
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        id="alert-dialog-slide-description"
      >
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => onActionButtonClicked(negativeAction, onCloseDialog)}
        color="primary"
      >
        {negativeText}
      </Button>
      <Button
        onClick={() => onActionButtonClicked(positiveAction, onCloseDialog)}
        color="primary"
      >
        {positiveText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CustomDialog;
