import React, { Component, Fragment } from 'react';

import Table from '../../components/common/table';
import Filter from '../../components/common/Filter';
import SectionTitle from '../../components/common/SectionTitle';

import { filterConfig, tabConfig } from './metaConfig';

const usersData = [{
  id: '1',
  name: 'Stenio Wagner',
  username: 'steniowagner',
  password: '123',
}, {
  id: '2',
  name: 'Ana Eridan',
  username: 'anaeridan',
  password: '123',
}, {
  id: '3',
  name: 'Manoel Elisval',
  username: 'manoelelisval',
  password: '123',
}, {
  id: '4',
  name: 'Beatriz Eliana',
  username: 'beatrizeliana',
  password: '123',
}];

class User extends Component {
  state = {
    usersFiltered: usersData,
    users: usersData,
  };

  onFilterUsers = (usersFiltered: Array<Object>) => {
    this.setState({
      usersFiltered,
    });
  };

  render() {
    const { users, usersFiltered } = this.state;

    return (
      <Fragment>
        <SectionTitle
          title="Usuários"
        />
        <Filter
          onFilterData={this.onFilterUsers}
          filterConfig={filterConfig}
          dataset={users}
        />
        <Table
          tabConfig={tabConfig}
          dataset={usersFiltered}
        />
      </Fragment>
    );
  }
}

export default User;
