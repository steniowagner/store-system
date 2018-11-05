import React, { Component } from 'react';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import UserForm from './form';

const test = [{
  name: 's1',
  username: 's1',
  password: '123',
  id: '1',
}, {
  name: 's2',
  username: 's2',
  password: '123',
  id: '2',
}, {
  name: 's3',
  username: 's3',
  password: '123',
  id: '31',
}, {
  name: 'ste4',
  username: 's4',
  password: '123',
  id: '4',
}, {
  name: 's5',
  username: 's5',
  password: '123',
  id: '5',
}, {
  name: 's6',
  username: 's6',
  password: '123',
  id: '6',
}, {
  name: 's7',
  username: '7',
  password: '123',
  id: '7',
}, {
  name: 'ste8',
  username: '8',
  password: '123',
  id: '8',
}, {
  name: 's9',
  username: 's9',
  password: '123',
  id: '9',
}, {
  name: 's10',
  username: 's10',
  password: '123',
  id: '10',
}];

class User extends Component {
  _passwordEdited = '';

  state = {
    users: test,
  };

  onCreateUser = (user: Object): void => {
    const { users } = this.state;

    this.setState({
      users: [{ ...user, id: Math.random() }, ...users],
    });
  };

  onEditUser = (userEdited: Object): void => {
    const { users } = this.state;

    const userEditedIndex = users.findIndex(user => user.id === userEdited.id);
    const userPassword = (this._passwordEdited || users[userEditedIndex].password);

    this.setState({
      users: Object.assign([], users, { [userEditedIndex]: { ...userEdited, password: userPassword } }),
    });
  };

  onEditPassword = (newPassword: string): void => {
    this._passwordEdited = newPassword;
  };

  onRemoveUser = (userId: string): void => {
    const { users } = this.state;

    this.setState({
      users: users.filter(user => user.id !== userId),
    });
  };

  render() {
    const { users } = this.state;

    return (
      <EntityComponent
        onRemoveItem={this.onRemoveUser}
        onCreateItem={this.onCreateUser}
        onEditItem={this.onEditUser}
        singularEntityName="Usuário"
        pluralEntityName="Usuários"
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        dataset={users}
        canBeCreated
        Form={props => (
          <UserForm
            onEditPassword={this.onEditPassword}
            {...props}
          />
        )}
      />
    );
  }
}

export default User;
