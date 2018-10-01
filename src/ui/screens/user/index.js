import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import FullScreenDialog from '../../components/common/FullScreenDialog';
import ActionButton from '../../components/common/ActionButton';
import Snackbar from '../../components/common/CustomSnackbar';
import Form from './components/Form';

import Filter from '../../components/common/Filter';
import Table from '../../components/common/table';

import { filterConfig, tabConfig, snackbarTypes } from './config';

const FilterAndCreateButtonWrapper = styled.div`
  width: 100%
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

type State = {
  usersFiltered: Array<Object>,
  isDeleteDialogOpen: boolean,
  users: Array<Object>,
  currentPage: number,
};

class User extends Component<{}, State> {
  state = {
    isFullScreenDialogOpen: false,
    isSnackbarOpen: false,
    usersFiltered: [],
    users: [],
    snackbarData: {},
    currentPage: 0,
  };

  onToggleFullScreenDialog = (): void => {
    const { isFullScreenDialogOpen } = this.state;

    this.setState({
      isFullScreenDialogOpen: !isFullScreenDialogOpen,
    });
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

  onCreateUser = (user: Object) => {
    const { users } = this.state;

    const openSnackBar = () => {
      const snackbarData = snackbarTypes.createUserSuccess;

      setTimeout(() => {
        this.setState({
          snackbarData,
        });
      }, 500); // Dialog closes so fast!
    };

    this.setState({
      usersFiltered: [user, ...users],
      users: [...users, user],
      isFullScreenDialogOpen: false,
      isSnackbarOpen: true,
    }, () => openSnackBar());
  };

  onClickCreateButton = (): void => {
    this.setState({
      isFullScreenDialogOpen: true,
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

  renderFilterAndCreatButtonSection = (): Object => {
    const { users } = this.state;

    return (
      <FilterAndCreateButtonWrapper>
        <Filter
          onFilterData={this.onFilterUsers}
          filterConfig={filterConfig}
          dataset={users}
        />
        <ActionButton
          action={this.onClickCreateButton}
          title="Criar Usuário"
        />
      </FilterAndCreateButtonWrapper>
    );
  };

  renderForm = (): Obejct => {
    const { isFullScreenDialogOpen } = this.state;

    return (
      <FullScreenDialog
        onClose={this.onToggleFullScreenDialog}
        isOpen={isFullScreenDialogOpen}
        title="CRIAR USUÁRIO"
      >
        <Form
          onCreateUser={this.onCreateUser}
        />
      </FullScreenDialog>
    );
  };

  render() {
    const {
      isSnackbarOpen,
      usersFiltered,
      snackbarData,
      currentPage,
    } = this.state;

    const { type, message } = snackbarData;

    return (
      <Fragment>
        <Typography
          variant="display3"
          gutterBottom
        >
          Usuários
        </Typography>
        {this.renderFilterAndCreatButtonSection()}
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
        {this.renderForm()}
      </Fragment>
    );
  }
}

export default User;
