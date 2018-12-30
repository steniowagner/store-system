import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as UserCreators } from '../../store/ducks/user';

import EntityComponent from '../../components/common/entity-component';
import Snackbar from '../../components/common/Snackbar';

import config from './config';
import UserForm from './form';

type Props = {
  getAllUsers: Function,
  createUser: Function,
  users: Array<Object>,
  removeUser: Function,
  editUser: Function,
};

type State = {
  isSnackbarOpen: boolean,
};

class User extends Component<Props, State> {
  _passwordEdited = '';

  state = {
    isSnackbarOpen: false,
  };

  componentDidMount() {
    const { getAllUsers } = this.props;

    getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { message, error } = nextProps.users;

    if (message || error) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  onCreateUser = async (user: Object): void => {
    const { createUser } = this.props;

    createUser(user);
  };

  onEditUser = (userEdited: Object): void => {
    const { editUser, users } = this.props;

    const userEditedIndex = users.data.findIndex(user => user.id === userEdited.id);
    const password = (this._passwordEdited || users.data[userEditedIndex].password);

    const user = {
      ...userEdited,
      password,
    };

    editUser(user);
  };

  onEditPassword = (newPassword: string): void => {
    this._passwordEdited = newPassword;
  };

  renderSnackbar = (stock: Object): Object => {
    const { isSnackbarOpen } = this.state;
    const { message, error } = stock;

    return (
      <Snackbar
        onCloseSnackbar={() => this.setState({ isSnackbarOpen: false })}
        isOpen={isSnackbarOpen}
        message={message}
        error={error}
      />
    );
  };

  render() {
    const { users } = this.props;
    const usernames = users.data.map(user => user.username);

    return (
      <Fragment>
        <EntityComponent
          onCreateItem={this.onCreateUser}
          onEditItem={this.onEditUser}
          singularEntityName="User"
          pluralEntityName="Users"
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          withOwnRemoveAction={this.onClickRemoveTableIcon}
          dataset={users.data}
          canBeCreated
          canBeEdited
          Form={props => (
            <UserForm
              onEditPassword={this.onEditPassword}
              usernames={usernames}
              {...props}
            />
          )}
        />
        {this.renderSnackbar(users)}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(UserCreators, dispatch);

const mapStateToProps = state => ({
  users: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
