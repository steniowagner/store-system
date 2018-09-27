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

const HeaderCell = styled.h2`
  font-weigth: 500;
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
  currentPage: number,
};

type State = {
  currentPage: number,
  rowsPerPage: number,
};

class CustomTable extends Component<Props, State> {
  state = {
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

  renderActionsSection = (): Object => (
    <ActionButtonsWrapper>
      <IconButton aria-label="Create">
        <CreateIcon />
      </IconButton>
      <IconButton aria-label="Search">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="Delete">
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
              ? this.renderActionsSection()
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
      </Container>
    );
  }
}

export default CustomTable;
