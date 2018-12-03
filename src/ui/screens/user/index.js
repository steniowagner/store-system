import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as UserCreators } from '../../store/ducks/user';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import UserForm from './form';

type Props = {
  unsubscribeUserEvents: Function,
  getAllUsers: Function,
  createUser: Function,
  removeUser: Function,
  editUser: Function,
  users: Array<Object>,
};

type State = {
  users: Array<Object>,
};

class User extends Component<Props, State> {
  _passwordEdited = '';

  componentDidMount() {
    const { getAllUsers } = this.props;

    getAllUsers();
  }

  componentWillUnmount() {
    const { unsubscribeUserEvents } = this.props;

    unsubscribeUserEvents();
  }

  onCreateUser = async (user: Object): void => {
    const { createUser } = this.props;

    createUser(user);
  };

  onEditUser = (userEdited: Object): void => {
    const { editUser, users } = this.props;

    const userEditedIndex = users.findIndex(user => user.id === userEdited.id);
    const password = (this._passwordEdited || users[userEditedIndex].password);

    const user = {
      ...userEdited,
      password,
    };

    editUser(user);
  };

  onEditPassword = (newPassword: string): void => {
    this._passwordEdited = newPassword;
  };

  render() {
    const { users } = this.props;
    const usernames = users.map(user => user.username);

    return (
      <Fragment>
        <EntityComponent
          onCreateItem={this.onCreateUser}
          onEditItem={this.onEditUser}
          singularEntityName="Usuário"
          pluralEntityName="Usuários"
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          withOwnRemoveAction={this.onClickRemoveTableIcon}
          dataset={users}
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
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(UserCreators, dispatch);

const mapStateToProps = state => ({
  users: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
