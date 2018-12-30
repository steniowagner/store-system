// @flow

import React, { Component } from 'react';

import Store from '@material-ui/icons/Store';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserCreators } from '../../store/ducks/user';

import RegisterUserForm from './components/RegisterUserForm';
import LoginForm from './components/LoginForm';
import Snackbar from '../common/Snackbar';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.containerColor};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.affirmative};
  border-radius: 36px;
`;

const StoreIcon = styled(Store)`
  color: ${({ theme }) => theme.colors.white};
`;

const StoreTitle = styled.p`
  margin: 16px 0;
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkText};
`;

const ContentContainer = styled(({ ...props }) => (
  <Paper
    {...props}
  />
))`
  padding: 24px;
`;

type Props = {
  getAllUsers: Function,
  createUser: Function,
  users: Array<Object>,
};

type State = {
  isSnackbarOpen: boolean,
  snackbarMessage: string,
  snackbarError: string,
}

class Login extends Component<Props, State> {
  state = {
    isSnackbarOpen: false,
    snackbarMessage: '',
    snackbarError: '',
  };

  componentDidMount() {
    const { getAllUsers } = this.props;

    getAllUsers();
  }

  onToggleSnackbar = (): void => {
    const { isSnackbarOpen } = this.state;

    this.setState({
      isSnackbarOpen: !isSnackbarOpen,
    });
  };

  setSnackbarMessage = (message: string): void => {
    this.setState({
      isSnackbarOpen: true,
      snackbarMessage: message,
      snackbarError: '',
    });
  };

  setSnackbarError = (error: string): void => {
    this.setState({
      isSnackbarOpen: true,
      snackbarError: error,
      snackbarMessage: '',
    });
  };

  renderRegisterUserForm = (createUser: Function, users: Array<Object>): Object => (
    <RegisterUserForm
      setSnackbarMessage={this.setSnackbarMessage}
      setSnackbarError={this.setSnackbarError}
      createUser={createUser}
      users={users}
    />
  );

  renderLoginForm = (users: Array<Object>): Object => (
    <LoginForm
      setSnackbarError={this.setSnackbarError}
      users={users}
    />
  );

  render() {
    const { snackbarMessage, isSnackbarOpen, snackbarError } = this.state;
    const { createUser, users } = this.props;

    const hasUsersRegistered = (users.length > 0);

    return (
      <Container>
        <Wrapper>
          <Wrapper>
            <IconWrapper>
              <StoreIcon
                style={{
                  fontSize: 36,
                }}
              />
            </IconWrapper>
            <StoreTitle>
              MY STORE
            </StoreTitle>
          </Wrapper>
          <ContentContainer>
            {hasUsersRegistered ? this.renderLoginForm(users) : this.renderRegisterUserForm(createUser, users)}
          </ContentContainer>
        </Wrapper>
        <Snackbar
          onCloseSnackbar={this.onToggleSnackbar}
          message={snackbarMessage}
          isOpen={isSnackbarOpen}
          error={snackbarError}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(UserCreators, dispatch);

const mapStateToProps = state => ({
  users: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
