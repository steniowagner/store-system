// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

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
  font-weight: 600;
`;

type Props = {
  onCreateItem: Function,
  onRemoveItem: Function,
  onEditItem: Function,
  snackbarTypes: Object,
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

  render() {
    return (
      <h1>hell</h1>
    );
  }
}

export default ApplicationEntityTemplate;
