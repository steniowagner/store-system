// @flow

import React, { Component, Fragment } from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

import styled from 'styled-components';

import Pagination from './components/Pagination';
import Dialog from '../Dialog';

const Container = styled(Paper)`
  width: 100%;
  min-height: 300px;
  max-height: 600px;
  overflow-x: auto;
  overflow-y: auto;
`;

const TableHeader = styled(TableHead)`
  background-color: ${({ theme }) => theme.colors.affirmative};
  width: 100%;
`;

const BodyRow = styled(TableRow)`
  background-color: ${({ theme, index }) => (index % 2 === 0 ? theme.colors.white : theme.colors.tableOddColor)};
`;

const HeaderCell = styled.p`
  font-weigth: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

const BodyCellText = styled.p`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 1.3em;
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type Props = {
  tabConfig: Array<Object>,
  dataset: Array<any>,
  onRemoveItem: Function,
  currentPage: number,
};

type State = {
  currentPage: number,
  rowsPerPage: number,
};

class CustomTable extends Component<Props, State> {
  state = {
    isRemoveDialogOpen: false,
    contextItem: {},
    currentPage: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    const { currentPage } = this.props;

    this.setState({
      currentPage,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: nextProps.currentPage,
    });
  }

  onToggleDialogRemove = (): void => {
    const { isRemoveDialogOpen } = this.state;

    this.setState({
      isRemoveDialogOpen: !isRemoveDialogOpen,
    });
  };

  onPageChange = (page: number): void => {
    this.setState({
      currentPage: page,
    });
  };

  onChangeRowsPerPage = (rowsPerPage: number): void => {
    this.setState({
      currentPage: 0,
      rowsPerPage,
    });
  };

  onRemoveItemClicked = (item: Object): void => {
    this.setState({
      isRemoveDialogOpen: true,
      contextItem: item,
    });
  };

  getCurrentPageAfterRemotion = (): number => {
    const { rowsPerPage, currentPage } = this.state;
    const { dataset } = this.props;

    const maxPageReacheable = Math.ceil((dataset.length - 1) / rowsPerPage) - 1;

    if ((dataset.length - 1) === 0) {
      return 0;
    }

    if (currentPage <= maxPageReacheable) {
      return currentPage;
    }

    return currentPage - 1;
  };

  renderDeleteDialog = (): Object => {
    const { isRemoveDialogOpen, contextItem } = this.state;
    const { onRemoveItem } = this.props;

    const newPage = this.getCurrentPageAfterRemotion();

    return (
      <Dialog
        description="Se executar esta ação, os dados deste Usuário serão perdidos para sempre, e não poderão ser recuperados de forma alguma."
        title="Tem certeza que quer remover este Usuário?"
        positiveAction={() => onRemoveItem(contextItem.id, newPage)}
        negativeAction={this.onToggleDialogRemove}
        onCloseDialog={this.onToggleDialogRemove}
        isOpen={isRemoveDialogOpen}
        positiveText="SIM"
        negativeText="NÃO"
      />
    );
  };

  renderActionsSection = (item: Object): Object => (
    <ActionButtonsWrapper>
      <IconButton
        aria-label="Create"
      >
        <CreateIcon />
      </IconButton>
      <IconButton
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        onClick={() => this.onRemoveItemClicked(item)}
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>
    </ActionButtonsWrapper>
  );

  renderHeader = (columnsTitles: Array<string>): Object => (
    <TableHeader>
      <TableRow>
        {columnsTitles.map(title => (
          <TableCell
            numeric={(typeof title === 'number')}
            key={title}
          >
            <HeaderCell>
              {title}
            </HeaderCell>
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>
  );

  renderRowCell = (row: Object, dataFields: Array<string>): Object => {
    const rowData = [...dataFields, 'actions'];

    return (
      <Fragment>
        {rowData.map(key => (
          <TableCell
            numeric={key === 'actions'}
            key={row.id + key}
            variant="body"
            padding="dense"
          >
            {key === 'actions'
              ? this.renderActionsSection(row)
              : (
                <BodyCellText>
                  {row[key]}
                </BodyCellText>
              )}
          </TableCell>
        ))}
      </Fragment>
    );
  }

  renderRows = (rows: Array<Object>, dataFields: Array<string>): Object => (
    <TableBody
      style={{
        overflowX: 'auto',
      }}
    >
      {rows.map((row, index) => (
        <BodyRow
          index={index}
          key={row.id}
        >
          {this.renderRowCell(row, dataFields)}
        </BodyRow>
      ))}
    </TableBody>
  );

  render() {
    const { rowsPerPage, currentPage } = this.state;
    const { tabConfig, dataset } = this.props;

    const columnsTitles = tabConfig.map(item => item.columnTitle);
    const dataFields = tabConfig.map(item => item.dataField);

    const paginationOffset = (currentPage * rowsPerPage) + rowsPerPage;
    const paginationStartIndex = currentPage * rowsPerPage;

    const datasetWithPagination = dataset.slice(paginationStartIndex, paginationOffset);

    return (
      <Container>
        <Table>
          {this.renderHeader([...columnsTitles, ''])}
          {this.renderRows(datasetWithPagination, dataFields)}
        </Table>
        <Pagination
          onChangeRowsPerPage={(value: number) => this.onChangeRowsPerPage(value)}
          datasetLength={dataset.length}
          onPageChange={this.onPageChange}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
        />
        {this.renderDeleteDialog()}
      </Container>
    );
  }
}

export default CustomTable;
