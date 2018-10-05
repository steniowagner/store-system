import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import FullScreenDialog from '../../components/common/FullScreenDialog';
import ActionButton from '../../components/common/ActionButton';
import Snackbar from '../../components/common/CustomSnackbar';
import Form from './Form';

import Filter from '../../components/common/Filter';
import Dialog from '../../components/common/Dialog';
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
  isFullScreenDialogOpen: boolean,
  isRemoveDialogOpen: boolean,
  isSnackbarOpen: boolean,
  usersFiltered: Array<Object>,
  users: Array<Object>,
  snackbarData: Object,
  contextUser: Object,
  currentPage: number,
  rowsPerPage: number,
  formMode: string,
};

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

class User extends Component<{}, State> {
  state = {
    isFullScreenDialogOpen: false,
    isRemoveDialogOpen: false,
    isSnackbarOpen: false,
    usersFiltered: test,
    users: test,
    snackbarData: {},
    contextUser: {},
    currentPage: 0,
    rowsPerPage: 0,
    formMode: '',
  };

  onToggleDialogRemove = (): void => {
    const { isRemoveDialogOpen } = this.state;

    this.setState({
      isRemoveDialogOpen: !isRemoveDialogOpen,
    });
  };

  onToggleFullScreenDialog = (): void => {
    const { isFullScreenDialogOpen } = this.state;

    this.setState({
      isFullScreenDialogOpen: !isFullScreenDialogOpen,
    });
  };

  onChageFormToEditMode = (): void => {
    this.setState({
      formMode: 'edit',
    });
  };

  onCloseSnackbar = (): void => {
    this.setState({
      isSnackbarOpen: false,
    });
  };

  onTablePageChange = (newPage: number): void => {
    this.setState({
      currentPage: newPage,
    });
  };

  onFilterUsers = (usersFiltered: Array<Object>) => {
    this.setState({
      currentPage: 0,
      usersFiltered,
    });
  };

  onCreateUser = (user: Object) => {
    const { users, usersFiltered } = this.state;

    this.setState({
      usersFiltered: [user, ...usersFiltered],
      users: [user, ...users],
      isFullScreenDialogOpen: false,
      isSnackbarOpen: true,
      snackbarData: {},
      currentPage: 0,
    }, () => this.openSnackBar(snackbarTypes.createUserSuccess));
  };

  onEditUser = (userEdited: Object): Object => {
    const { contextUser, users, usersFiltered } = this.state;

    const userData = {
      password: contextUser.password,
      username: userEdited.username,
      name: userEdited.name,
      id: contextUser.id,
    };

    const userFilteredIndex = usersFiltered.findIndex(userFiltered => userFiltered.id === contextUser.id);
    const usersIndex = users.findIndex(user => user.id === contextUser.id);

    this.setState({
      usersFiltered: Object.assign([], usersFiltered, { [userFilteredIndex]: userData }),
      users: Object.assign([], users, { [usersIndex]: userData }),
      isFullScreenDialogOpen: false,
      isSnackbarOpen: true,
      snackbarData: {},
    }, () => this.openSnackBar(snackbarTypes.editUserSuccess));
  };

  onEditUserPassword = (userPassword: string): Object => {
    const { contextUser } = this.state;

    this.setState({
      contextUser: Object.assign({}, contextUser, { password: userPassword }),
    });
  };

  onClickCreateButton = (): void => {
    this.setState({
      isFullScreenDialogOpen: true,
      formMode: 'create',
    });
  };

  onTableEditIconClicked = (user: Object): void => {
    this.setState({
      isFullScreenDialogOpen: true,
      contextUser: user,
      formMode: 'edit',
    });
  };

  onTableVisualizeIconClicked = (user: Object): void => {
    this.setState({
      isFullScreenDialogOpen: true,
      contextUser: user,
      formMode: 'visualize',
    });
  };

  onTableRemoveIconClicked = (user: Object, rowsPerPage: number): void => {
    this.setState({
      isRemoveDialogOpen: true,
      contextUser: user,
      rowsPerPage,
    });
  };

  onRemoveUser = (): void => {
    const { users, usersFiltered, contextUser } = this.state;
    const snackbarData = snackbarTypes.removeUserSuccess;

    const currentPage = this.getCurrentPageAfterRemotion();

    this.setState({
      usersFiltered: usersFiltered.filter(userFiltered => userFiltered.id !== contextUser.id),
      users: users.filter(user => user.id !== contextUser.id),
      isFullScreenDialogOpen: false,
      isSnackbarOpen: true,
      snackbarData,
      currentPage,
    });
  };

  getCurrentPageAfterRemotion = (): number => {
    const { rowsPerPage, currentPage, usersFiltered } = this.state;

    const maxPageReacheable = Math.ceil((usersFiltered.length - 1) / rowsPerPage) - 1;

    if ((usersFiltered.length - 1) === 0) {
      return 0;
    }

    if (currentPage <= maxPageReacheable) {
      return currentPage;
    }

    return currentPage - 1;
  };

  openSnackBar = (snackbarData: Object): void => {
    setTimeout(() => {
      this.setState({
        snackbarData,
      });
    }, 700);
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
    const { isFullScreenDialogOpen, formMode, contextUser } = this.state;

    const mode = {
      visualize: 'VISUALIZAR',
      create: 'CRIAR',
      edit: 'EDITAR',
    };

    const user = ((formMode === 'edit' || formMode === 'visualize') ? contextUser : {});

    return (
      <FullScreenDialog
        onClose={this.onToggleFullScreenDialog}
        title={`${mode[formMode]} USUÁRIO`}
        isOpen={isFullScreenDialogOpen}
      >
        <Form
          onChageFormToEditMode={this.onChageFormToEditMode}
          onEditUserPassword={this.onEditUserPassword}
          onRemoveUser={this.onRemoveUser}
          onCreateUser={this.onCreateUser}
          onEditUser={this.onEditUser}
          mode={formMode}
          user={user}
        />
      </FullScreenDialog>
    );
  };

  renderRemoveDialog = (): Object => {
    const { isRemoveDialogOpen } = this.state;

    return (
      <Dialog
        description="Se executar esta ação, os dados deste Usuário serão perdidos para sempre, e não poderão ser recuperados de forma alguma."
        title="Tem certeza que quer remover este Usuário?"
        positiveAction={() => this.onRemoveUser()}
        negativeAction={this.onToggleDialogRemove}
        onCloseDialog={this.onToggleDialogRemove}
        isOpen={isRemoveDialogOpen}
        positiveText="SIM"
        negativeText="NÃO"
      />
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
          variant="display2"
          gutterBottom
        >
          Usuários
        </Typography>
        {this.renderFilterAndCreatButtonSection()}
        <Table
          onVisualizeIconClicked={this.onTableVisualizeIconClicked}
          onEditIconClicked={this.onTableEditIconClicked}
          onRemoveIconClicked={this.onTableRemoveIconClicked}
          updatePageIndex={this.onTablePageChange}
          onRemoveItem={this.onRemoveUser}
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
        {this.renderRemoveDialog()}
      </Fragment>
    );
  }
}

export default User;
