// @flow

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BudgetCreators } from '../../../store/ducks/budget';
import { Creators as AuthCreators } from '../../../store/ducks/auth';

import { Wrapper, InputWrapper, ButtonWrapper } from './styles';
import Input from '../../common/CustomInput';

type Props = {
  setOutdatedBudgets: Function,
  setSnackbarError: Function,
  users: Array<Object>,
  login: Function,
};

type State = {
  username: string,
  password: string,
}

class LoginForm extends Component<Props, State> {
  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
    this._usernameInputRef.focus();
  }

  onTypeInputValue = (stateRef: string, value: string) => {
    this.setState({
      [stateRef]: value,
    });
  };

  onClickEnterButton = (): void => {
    const { setSnackbarError, users } = this.props;
    const { username, password } = this.state;

    const userSelected = users.filter(user => ((user.username === username) && (user.password === password)))[0];

    return (userSelected ? this.handleLogin(userSelected) : setSnackbarError('User not Found'));
  };

  handleLogin = (user: Object): void => {
    const { setOutdatedBudgets, login } = this.props;

    setOutdatedBudgets();

    login(user);
  };

  render() {
    const { username, password } = this.state;

    return (
      <Wrapper>
        <InputWrapper>
          <Input
            inputRef={(input) => { this._usernameInputRef = input; }}
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
        <ButtonWrapper>
          <Button
            disabled={(password.length < 6)}
            variant="outlined"
            onClick={this.onClickEnterButton}
            color="primary"
          >
            SIGN IN
          </Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

const Creators = Object.assign({}, BudgetCreators, AuthCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
