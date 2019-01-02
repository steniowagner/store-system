// @flow

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import { Wrapper, InputWrapper, ButtonWrapper } from './styles';
import Input from '../../common/CustomInput';

type Props = {
  setSnackbarMessage: Function,
  setSnackbarError: Function,
  createUser: Function,
  users: Array<Object>,
};

type State = {
  repeatedPassword: string,
  password: string,
  username: string,
  name: string,
};

class RegisterUserForm extends Component<Props, State> {
  state = {
    repeatedPassword: '',
    password: '',
    username: '',
    name: '',
  };

  componentDidMount() {
    this._nameInputRef.focus();
  }

  onTypeInputValue = (stateRef: string, value: string) => {
    this.setState({
      [stateRef]: value,
    });
  };

  onClickRegisterButton = (): void => {
    const {
      repeatedPassword,
      username,
      password,
      name,
    } = this.state;

    const {
      setSnackbarMessage,
      setSnackbarError,
      createUser,
      users,
    } = this.props;

    const isUsernameAlreadyRegistered = this.isUsernameAlreadyRegistered(users, username);
    const isSamePassword = (password === repeatedPassword);

    if (!isSamePassword) {
      setSnackbarError('The passwords are not the same');
      return;
    }

    if (isUsernameAlreadyRegistered) {
      setSnackbarError('This Username has already in use');
      return;
    }

    if (password.length < 6) {
      setSnackbarError('The password must have at least 6 characters');
      return;
    }

    setSnackbarMessage('User Registered Successfully');

    createUser({ username, name, password });
  };

  isUsernameAlreadyRegistered = (users: Array<Object>, username: string): boolean => {
    if (users.length === 0) {
      return false;
    }

    return users.some(user => (user.username === username));
  };

  render() {
    const {
      repeatedPassword,
      password,
      username,
      name,
    } = this.state;

    const typedPasswords = (!!repeatedPassword && !!password);
    const shouldDisableButton = !(!!name && !!username && typedPasswords);

    return (
      <Wrapper>
        <InputWrapper>
          <Input
            inputRef={(input) => { this._nameInputRef = input; }}
            onChange={(event: Object): void => this.onTypeInputValue('name', event.target.value)}
            onBlur={() => {}}
            placeholder=""
            value={name}
            label="Name"
            type="text"
            id="name"
            error=""
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={(event: Object): void => this.onTypeInputValue('username', event.target.value)}
            onBlur={() => {}}
            value={username}
            label="Username"
            placeholder=""
            id="username"
            type="text"
            error=""
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={(event: Object): void => this.onTypeInputValue('password', event.target.value)}
            onBlur={() => {}}
            value={password}
            type="password"
            placeholder=""
            label="Password"
            id="password"
            error=""
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={(event: Object): void => this.onTypeInputValue('repeatedPassword', event.target.value)}
            value={repeatedPassword}
            onBlur={() => {}}
            label="Confirm the Password"
            id="repeatedPassword"
            placeholder=""
            type="password"
            error=""
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            onClick={this.onClickRegisterButton}
            disabled={shouldDisableButton}
            variant="outlined"
            color="primary"
          >
            SIGN UP
          </Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

export default RegisterUserForm;
