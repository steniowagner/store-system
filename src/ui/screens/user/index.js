import React, { Component, Fragment } from 'react';

import SectionTitle from '../../components/common/SectionTitle';
import Filter from '../../components/common/Filter';
import Table from '../../components/common/table';

import { filterConfig, tabConfig, snackbarTypes } from './metaConfig';

import Snackbar from '../../components/common/CustomSnackbar';

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
  isDeleteDialogOpen: boolean,
  users: Array<Object>,
  currentPage: number,
};

class User extends Component<{}, State> {
  state = {
    usersFiltered: usersData,
    isSnackbarOpen: false,
    users: usersData,
    snackbarData: {},
    currentPage: 0,
  };

  onCloseSnackbar = (): void => {
    this.setState({
      isSnackbarOpen: false,
    });
  };

  onFilterUsers = (usersFiltered: Array<Object>) => {
    this.setState({
      currentPage: 0,
      usersFiltered,
    });
  };

  onDeleteUser = (userId: any, currentPage: number): void => {
    const { users, usersFiltered } = this.state;

    const snackbarData = snackbarTypes.removeUserSuccess;

    this.setState({
      usersFiltered: usersFiltered.filter(userFiltered => userFiltered.id !== userId),
      users: users.filter(user => user.id !== userId),
      isSnackbarOpen: true,
      snackbarData,
      currentPage,
    });
  };

  render() {
    const {
      isSnackbarOpen,
      usersFiltered,
      snackbarData,
      currentPage,
      users,
    } = this.state;

    const { type, message } = snackbarData;

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
          onRemoveItem={this.onDeleteUser}
          currentPage={currentPage}
          dataset={usersFiltered}
          tabConfig={tabConfig}
        />
        <Snackbar
          onCloseSnackbar={this.onCloseSnackbar}
          isOpen={isSnackbarOpen && !!type}
          message={message}
          type={type}
        />
      </Fragment>
    );
  }
}

export default User;
