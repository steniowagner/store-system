// @flow

import React, { Component } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import moment from 'moment';

import Input from '../../CustomInput';

type Props = {
  isChooseDateDialogOpen: boolean,
  onToggleDateDialog: Function,
};

type State = {
  dateChoosed: string,
};

class DateFilterDialog extends Component<Props, State> {
  state = {
    dateChoosed: '',
  }

  onChooseDate = (dateChoosed: string): void => {
    this.setState({
      dateChoosed,
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
      Escolha uma Data
    </DialogTitle>
  );

  renderActionButtons = (): Object => {
    const { onToggleDateDialog, onChooseDate } = this.props;
    const { dateChoosed } = this.state;

    const date = moment(dateChoosed).format('DD/MM/YYYY');

    return (
      <DialogActions>
        <Button
          onClick={() => this.setState({ dateChoosed: '' }, () => onToggleDateDialog())}
          color="primary"
        >
          VOLTAR
        </Button>
        <Button
          onClick={() => this.setState({ dateChoosed: '' }, () => onChooseDate(date))}
          disabled={!dateChoosed}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    );
  }

  renderDateInput = (): Object => {
    const { dateChoosed } = this.state;

    return (
      <Input
        onChange={e => this.onChooseDate(e.target.value)}
        value={dateChoosed}
        onBlur={() => {}}
        id="date-filter"
        placeholder=""
        type="date"
        error=""
        label=""
      />
    );
  };

  render() {
    const { isChooseDateDialogOpen, onToggleDateDialog } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        open={isChooseDateDialogOpen}
        onClose={onToggleDateDialog}
        disableBackdropClick
        maxWidth="sm"
      >
        {this.renderTitle()}
        <DialogContent>
          {this.renderDateInput()}
        </DialogContent>
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default DateFilterDialog;
