import React, { Component, Fragment } from 'react';

import SectionTitle from '../../components/common/SectionTitle';
import Filter from '../../components/common/Filter';
import Table from '../../components/common/table';

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
}, {
  id: '13',
  name: 'Stenio Wag1ner',
  username: 'sten2iowagner',
  password: '1233',
}, {
  id: '212',
  name: 'Ana Eri3dan',
  username: 'ana3eridan',
  password: '1233',
}, {
  id: '43',
  name: 'Mano4el Elisval',
  username: 'm4anoelelisval',
  password: '1423',
}, {
  id: '54',
  name: 'Be5atriz Eliana',
  username: 'beat5rizeliana',
  password: '1235',
}, {
  id: '12132111',
  name: 'Stenio 3Wagner',
  username: 'steni2owagner',
  password: '1213',
}, {
  id: '12312',
  name: 'Ana Eri23121dan',
  username: 'ana123eridan',
  password: '11232323',
}, {
  id: '111113',
  name: 'Manoel Eli132131sval',
  username: 'manoelelisval',
  password: '123',
}, {
  id: '4444444',
  name: 'Beatriz 444Eliana',
  username: 'beatriz4444eliana',
  password: '123',
}, {
  id: '1112313123123432445435',
  name: 'Stenio Wagn12321321er',
  username: 'stenio12321wagner',
  password: '1212313',
}, {
  id: '2357898978',
  name: 'Ana 1232131231231',
  username: 'ana2222eridan',
  password: '123222',
}, {
  id: '3155550',
  name: 'Manoel Elisval',
  username: 'manoelelisval',
  password: '123',
}, {
  id: '4567w2',
  name: '3432423 Eliana',
  username: 'beatr2342342izeliana',
  password: '2342342342',
}];

type State = {
  usersFiltered: Array<Object>,
  users: Array<Object>,
  currentPage: number,
};

class User extends Component<{}, State> {
  state = {
    usersFiltered: usersData,
    users: usersData,
    currentPage: 0,
  };

  onFilterUsers = (usersFiltered: Array<Object>) => {
    this.setState({
      usersFiltered,
      currentPage: 0,
    });
  };

  render() {
    const { users, usersFiltered, currentPage } = this.state;

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
          currentPage={currentPage}
          dataset={usersFiltered}
          tabConfig={tabConfig}
        />
      </Fragment>
    );
  }
}

export default User;
