// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import FullScreenDialog from '../FullScreenDialog';
import ActionButton from '../ActionButton';
import Filter from '../Filter';
import Dialog from '../Dialog';
import Table from '../table';

const FilterAndCreateButtonWrapper = styled.div`
  width: 100%
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 32px 0;
`;

const FilterWrapper = styled.div`
  width: 80%;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 42px;
  font-weight: 500;
`;

type Props = {
  onCreateItem: Function,
  onRemoveItem: ?Function,
  onEditItem: ?Function,
  Form: Function,
  filterConfig: Object,
  tabConfig: Object,
  singularEntityName: string,
  pluralEntityName: string,
  withOwnTitle: string,
  canBeRemoved: ?boolean,
  canBeCreated: ?boolean,
  canBeEdited: ?boolean,
  dataset: Array<Object>,
};

type State = {
  isFullScreenDialogOpen: boolean,
  isRemoveDialogOpen: boolean,
  itemsFiltered: Array<Object>,
  items: Array<Object>,
  contextItem: Object,
  currentPage: number,
  rowsPerPage: number,
  formMode: string,
};

class EntityComponent extends Component<Props, State> {
  state = {
    isFullScreenDialogOpen: false,
    isRemoveDialogOpen: false,
    itemsFiltered: [],
    contextItem: {},
    currentPage: 0,
    rowsPerPage: 0,
    formMode: '',
  };

  componentWillReceiveProps(nextProps) {
    const { formMode } = this.state;
    const { dataset } = nextProps;

    this.setState({
      itemsFiltered: dataset,
    });

    if (formMode === 'edit') {
      const { itemsFiltered, contextItem } = this.state;

      const indexItemEditedOnItemsFiltered = itemsFiltered.findIndex(
        itemFiltered => itemFiltered.id === contextItem.id,
      );

      const indexItemEditedOnOriginalDataset = dataset.findIndex(
        item => item.id === contextItem.id,
      );

      const itemEdited = dataset[indexItemEditedOnOriginalDataset];

      this.setState({
        itemsFiltered: Object.assign([], itemsFiltered, {
          [indexItemEditedOnItemsFiltered]: itemEdited,
        }),
      });
    }
  }

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

  onTableDetailIconClicked = (item: Object, rowsPerPage: number): void => {
    this.setState({
      isFullScreenDialogOpen: true,
      formMode: 'detail',
      contextItem: item,
      rowsPerPage,
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

  createItem = (itemCreated: Object): void => {
    const { onCreateItem } = this.props;

    this.setState({
      isFullScreenDialogOpen: false,
      currentPage: 0,
    }, () => onCreateItem(itemCreated));
  };

  editItem = (item: Object): void => {
    const { onEditItem } = this.props;
    const { contextItem } = this.state;

    const itemEdited = {
      ...contextItem,
      ...item,
    };

    this.setState({
      isFullScreenDialogOpen: false,
    }, () => onEditItem(itemEdited));
  };

  removeItem = (): void => {
    const { itemsFiltered, contextItem } = this.state;
    const { onRemoveItem } = this.props;

    const itemsFilteredAfterRemotion = itemsFiltered.filter(itemFiltered => itemFiltered.id !== contextItem.id);

    const currentPage = this.getCurrentPageAfterRemotion();

    this.setState({
      itemsFiltered: itemsFilteredAfterRemotion,
      isFullScreenDialogOpen: false,
      currentPage,
    }, () => onRemoveItem(contextItem.id));
  };

  renderForm = (): Obejct => {
    const { isFullScreenDialogOpen, formMode, contextItem } = this.state;
    const { singularEntityName, Form, withOwnTitle } = this.props;

    const mode = {
      detail: 'VISUALIZAR',
      create: 'CADASTRAR',
      edit: 'EDITAR',
    };

    const isFormCreateMode = (formMode === 'create');
    const item = (!isFormCreateMode ? contextItem : {});

    const ownTitle = (!!withOwnTitle && withOwnTitle.toUpperCase());
    const defaultTitle = `${mode[formMode]} ${singularEntityName.toUpperCase()}`;
    const title = (ownTitle || defaultTitle);

    return !!Form && (
      <FullScreenDialog
        onClose={this.onToggleFullScreenDialog}
        isOpen={isFullScreenDialogOpen}
        title={title}
      >
        <Form
          onToggleFullScreenDialog={this.onToggleFullScreenDialog}
          onChageFormToEditMode={this.onChageFormToEditMode}
          onRemoveItem={this.removeItem}
          onCreateItem={this.createItem}
          onEditItem={this.editItem}
          mode={formMode}
          item={item}
        />
      </FullScreenDialog>
    );
  };

  renderFilterAndCreatButtonSection = (): Object => {
    const {
      singularEntityName,
      canBeCreated,
      filterConfig,
      withOwnTitle,
      dataset,
    } = this.props;

    const actionButtonTitle = (withOwnTitle || singularEntityName);

    return (
      <FilterAndCreateButtonWrapper>
        <FilterWrapper>
          <Filter
            onFilterData={this.onFilterItems}
            shouldFilterAfterSelectFilter
            filterConfig={filterConfig}
            dataset={dataset}
          />
        </FilterWrapper>
        {canBeCreated && (
          <ActionButton
            action={this.onClickCreateButton}
            title={actionButtonTitle}
            withIcon
          />
        )}
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
        positiveAction={this.removeItem}
        negativeAction={this.onToggleDialogRemove}
        onCloseDialog={this.onToggleDialogRemove}
        isOpen={isRemoveDialogOpen}
        disableBackdropClick
        positiveText="SIM"
        negativeText="NÃO"
      />
    );
  };

  renderTable = (): Object => {
    const { canBeRemoved, canBeEdited, tabConfig } = this.props;
    const { itemsFiltered, currentPage } = this.state;

    return (
      <Table
        onDetailIconClicked={this.onTableDetailIconClicked}
        onRemoveIconClicked={this.onTableRemoveIconClicked}
        onEditIconClicked={this.onTableEditIconClicked}
        updatePageIndex={this.onTablePageChange}
        canBeRemoved={canBeRemoved}
        canBeEdited={canBeEdited}
        currentPage={currentPage}
        dataset={itemsFiltered}
        tabConfig={tabConfig}
        withPagination
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
        {this.renderForm()}
        {this.renderRemoveDialog()}
      </Fragment>
    );
  }
}

export default EntityComponent;
