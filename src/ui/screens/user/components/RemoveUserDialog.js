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

import Input from '../../../components/common/CustomInput';

const InputWrapper = styled.div`
  margin-top: 16px;
`;

type Props = {
  onCloseDialog: Function,
  onRemoveUser: Function,
  password: string,
  isOpen: boolean,
};

type State = {
  passwordConfirm: string,
    error: string,
};

class RemoveUserDialog extends Component<Props, State> {
  state = {
    passwordConfirm: '',
    error: '',
  };

  onTypePasswordConfirm = (event: Object): void => {
    this.setState({
      passwordConfirm: event.target.value,
      error: '',
    });
  };

  onSetError = (): void => {
    this.setState({
      error: 'Senha Incorreta',
    });
  };

  onClickCancelButton = (): void => {
    const { onCloseDialog } = this.props;

    this.setState({
      passwordConfirm: '',
      error: '',
    }, () => onCloseDialog());
  };

  onClickOkButton = (): void => {
    const { onRemoveUser } = this.props;

    const isPasswordCorrect = this.checkPassword();

    const properAction = (isPasswordCorrect ? onRemoveUser : this.onSetError);

    this.setState({
      passwordConfirm: '',
    }, () => properAction());
  };

  checkPassword = (): boolean => {
    const { passwordConfirm } = this.state;
    const { password } = this.props;

    return (passwordConfirm === password);
  };

  renderInput = (): Object => {
    const { passwordConfirm, error } = this.state;

    return (
      <InputWrapper>
        <Input
          onChange={this.onTypePasswordConfirm}
          value={passwordConfirm}
          id="removeUser"
          placeholder=""
          error={error}
          type="password"
          autoFocus
        />
      </InputWrapper>
    );
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
      Remover Usuário
    </DialogTitle>
  );

  renderActionButtons = (): Object => (
    <DialogActions>
      <Button
        onClick={this.onClickCancelButton}
        color="primary"
      >
        CANCELAR
      </Button>
      <Button
        onClick={this.onClickOkButton}
        color="primary"
      >
        OK
      </Button>
    </DialogActions>
  );

  render() {
    const { onCloseDialog, isOpen } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={onCloseDialog}
        open={isOpen}
        maxWidth="xs"
        fullWidth
      >
        {this.renderTitle()}
        <DialogContent>
          <DialogContentText>
            Informe a senha do Usuário para permitir a remoção
          </DialogContentText>
          {this.renderInput()}
        </DialogContent>
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default RemoveUserDialog;
