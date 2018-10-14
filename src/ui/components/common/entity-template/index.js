// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import snackBarConfig from './snackBarConfig';

import FullScreenDialog from '../FullScreenDialog';
import ActionButton from '../ActionButton';
import Snackbar from '../CustomSnackbar';
import Filter from '../Filter';
import Dialog from '../Dialog';
import Table from '../table';

const FilterAndCreateButtonWrapper = styled.div`
  width: 100%
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 42px;
  font-weight: 500;
`;

type Props = {
  onCreateItem: Function,
  onRemoveItem: Function,
  onEditItem: Function,
  filterConfig: Object,
  tabConfig: Object,
  singularEntityName: string,
  pluralEntityName: string,
  dataset: Array<Object>,
};

type State = {
  isFullScreenDialogOpen: boolean,
  isRemoveDialogOpen: boolean,
  isSnackbarOpen: boolean,
  itemsFiltered: Array<Object>,
  items: Array<Object>,
  snackbarData: Object,
  contextItem: Object,
  currentPage: number,
  rowsPerPage: number,
  formMode: string,
};

class ApplicationEntityTemplate extends Component<Props, State> {
  state = {
    isFullScreenDialogOpen: false,
    isRemoveDialogOpen: false,
    isSnackbarOpen: false,
    itemsFiltered: [],
    items: [],
    snackbarData: {},
    contextItem: {},
    currentPage: 0,
    rowsPerPage: 0,
    formMode: '',
  };

  componentDidMount() {
    const { dataset } = this.props;

    this.setState({
      items: dataset,
      itemsFiltered: dataset,
    });
  }

  onToggleDialogRemove = (): void => {
    const { isRemoveDialogOpen } = this.state;

    this.setState({
      isRemoveDialogOpen: !isRemoveDialogOpen,
    });
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

  onFilterItems = (itemsFiltered: Array<Object>) => {
    this.setState({
      currentPage: 0,
      itemsFiltered,
    });
  };

  onClickCreateButton = (): void => {
    this.setState({
      isFullScreenDialogOpen: true,
      formMode: 'create',
    });
  };

  onTableEditIconClicked = (item: Object): void => {
    this.setState({
      isFullScreenDialogOpen: true,
      contextItem: item,
      formMode: 'edit',
    });
  };

  onTableVisualizeIconClicked = (item: Object): void => {
    this.setState({
      isFullScreenDialogOpen: true,
      formMode: 'visualize',
      contextItem: item,
    });
  };

  onTableRemoveIconClicked = (item: Object, rowsPerPage: number): void => {
    this.setState({
      isRemoveDialogOpen: true,
      contextItem: item,
      rowsPerPage,
    });
  };

  getCurrentPageAfterRemotion = (): number => {
    const { rowsPerPage, currentPage, itemsFiltered } = this.state;

    const maxPageReacheable = Math.ceil((itemsFiltered.length - 1) / rowsPerPage) - 1;

    if ((itemsFiltered.length - 1) === 0) {
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
    const { dataset, filterConfig, singularEntityName } = this.props;

    return (
      <FilterAndCreateButtonWrapper>
        <Filter
          onFilterData={this.onFilterItems}
          filterConfig={filterConfig}
          dataset={dataset}
        />
        <ActionButton
          title={`Criar ${singularEntityName}`}
          action={this.onClickCreateButton}
        />
      </FilterAndCreateButtonWrapper>
    );
  };

  renderRemoveDialog = (): Object => {
    const { isRemoveDialogOpen } = this.state;
    const { singularEntityName } = this.props;

    return (
      <Dialog
        description={`Se executar esta ação, os dados deste ${singularEntityName} serão perdidos para sempre, e não poderão ser recuperados de forma alguma.`}
        title={`Tem certeza que quer remover este ${singularEntityName}?`}
        positiveAction={() => {}}
        negativeAction={this.onToggleDialogRemove}
        onCloseDialog={this.onToggleDialogRemove}
        isOpen={isRemoveDialogOpen}
        positiveText="SIM"
        negativeText="NÃO"
      />
    );
  };

  renderTable = (): Object => {
    const { itemsFiltered, currentPage } = this.state;
    const { tabConfig } = this.props;

    return (
      <Table
        onVisualizeIconClicked={this.onTableVisualizeIconClicked}
        onRemoveIconClicked={this.onTableRemoveIconClicked}
        onEditIconClicked={this.onTableEditIconClicked}
        updatePageIndex={this.onTablePageChange}
        // onRemoveItem={this.onRemoveUser}
        currentPage={currentPage}
        dataset={itemsFiltered}
        tabConfig={tabConfig}
      />
    );
  };

  renderSnackbar = (): Object => {
    const { snackbarData, isSnackbarOpen } = this.state;
    const { type, message } = snackbarData;

    return (
      <Snackbar
        onCloseSnackbar={this.onCloseSnackbar}
        isOpen={isSnackbarOpen && !!type}
        message={message}
        type={type}
      />
    );
  };

  render() {
    const { pluralEntityName } = this.props;

    return (
      <Fragment>
        <Title>
          {pluralEntityName}
        </Title>
        {this.renderFilterAndCreatButtonSection()}
        {this.renderTable()}
        {this.renderSnackbar()}
        {this.renderRemoveDialog()}
      </Fragment>
    );
  }
}

export default ApplicationEntityTemplate;
