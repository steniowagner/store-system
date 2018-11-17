import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as HomeCreators } from '../../store/ducks/user';

import EntityComponent from '../../components/common/entity-component';
import RemoveUserDialog from './components/RemoveUserDialog';

import config from './config';
import UserForm from './form';

type Props = {
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

  state = {
    isRemoveUserDialogOpen: false,
    contextUser: {},
  };

  componentDidMount() {
    const { getAllUsers } = this.props;

    getAllUsers();
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

  onRemoveUser = (): void => {
    const { contextUser } = this.state;
    const { removeUser } = this.props;

    this.setState({
      isRemoveUserDialogOpen: false,
    }, () => removeUser(contextUser.id));
  };

  onClickRemoveTableIcon = (user: Object): void => {
    this.setState({
      isRemoveUserDialogOpen: true,
      contextUser: user,
    });
  };

  onToggleRemoveDialog = (): void => {
    const { isRemoveUserDialogOpen } = this.state;

    this.setState({
      isRemoveUserDialogOpen: !isRemoveUserDialogOpen,
    });
  };

  renderRemoveUserDialog = (): Object => {
    const { isRemoveUserDialogOpen, contextUser } = this.state;
    const { password } = contextUser;

    return (
      <RemoveUserDialog
        onCloseDialog={this.onToggleRemoveDialog}
        onRemoveUser={this.onRemoveUser}
        isOpen={isRemoveUserDialogOpen}
        password={password}
      />
    );
  };

  render() {
    const { users } = this.props;

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
          canBeRemoved
          canBeEdited
          Form={props => (
            <UserForm
              onEditPassword={this.onEditPassword}
              {...props}
            />
          )}
        />
        {this.renderRemoveUserDialog()}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(HomeCreators, dispatch);

const mapStateToProps = state => ({
  users: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
