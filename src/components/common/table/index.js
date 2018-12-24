// @flow

import React, { Component, Fragment } from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';

import styled from 'styled-components';

import Pagination from './components/Pagination';

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
  onRemoveIconClicked: ?Function,
  onDetailIconClicked: Function,
  onEditIconClicked: ?Function,
  setItemsPerPage: ?Function,
  updatePageIndex: Function,
  tabConfig: Array<Object>,
  dataset: Array<any>,
  canBeRemoved: boolean,
  canBeEdited: boolean,
  itemsPerPage: ?number,
  currentPage: number,
};

type State = {
  rowsPerPage: number,
};

class CustomTable extends Component<Props, State> {
  state = {
    rowsPerPage: 5,
  };

  componentDidMount() {
    const { itemsPerPage } = this.props;

    this.handleRowsPerPageValue(itemsPerPage);
  }

  componentWillReceiveProps(nextProps) {
    const { itemsPerPage } = nextProps;

    this.handleRowsPerPageValue(itemsPerPage);
  }

  onChangeRowsPerPage = (rowsPerPage: number): void => {
    const { setItemsPerPage } = this.props;

    this.setState({
      rowsPerPage,
    }, () => !!setItemsPerPage && setItemsPerPage(rowsPerPage));
  };

  handleRowsPerPageValue = (itemsPerPage: any): void => {
    const { rowsPerPage } = this.state;

    this.setState({
      rowsPerPage: (itemsPerPage || rowsPerPage),
    });
  };

  renderActionsSection = (item: Object, index: number): Object => {
    const {
      onDetailIconClicked,
      onRemoveIconClicked,
      onEditIconClicked,
      canBeRemoved,
      canBeEdited,
    } = this.props;

    const { canEditSingleItem } = item;

    const { rowsPerPage } = this.state;

    return (
      <ActionButtonsWrapper>
        {(canBeEdited || canEditSingleItem) && (
          <IconButton
            onClick={() => onEditIconClicked({ ...item, index })}
            aria-label="Edit"
            disableRipple
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => onDetailIconClicked(item, rowsPerPage)}
          aria-label="Search"
          disableRipple
        >
          <SearchIcon />
        </IconButton>
        {canBeRemoved && (
          <IconButton
            onClick={() => onRemoveIconClicked(item, rowsPerPage)}
            aria-label="Delete"
            disableRipple
          >
            <DeleteIcon />
          </IconButton>
        )}
      </ActionButtonsWrapper>
    );
  }

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

  renderRowCell = (row: Object, dataFields: Array<string>, index: number): Object => {
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
              ? this.renderActionsSection(row, index)
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
          {this.renderRowCell(row, dataFields, index)}
        </BodyRow>
      ))}
    </TableBody>
  );

  render() {
    const {
      updatePageIndex,
      currentPage,
      tabConfig,
      dataset,
    } = this.props;

    const { rowsPerPage } = this.state;

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
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          datasetLength={dataset.length}
          onPageChange={updatePageIndex}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
        />
      </Container>
    );
  }
}

export default CustomTable;
