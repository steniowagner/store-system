// @flow

import React, { Component, Fragment } from 'react';

import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
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

const Container = styled(Paper)`
  width: 100%;
  overflow-x: auto;
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

const PaginationWraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

type Props = {
  tabConfig: Array<Object>,
  dataset: Array<any>,
};

class CustomTable extends Component<Props, {}> {
  state = {
    fieldKeys: [],
  };

  getKeys = (item: Object): Array<string> => {
    const keys = Object.keys(item);

    return keys;
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
    <TableBody>
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

  renderFooter = (): Object => (
    <TableFooter>
      <TableRow>
        <TablePagination
          labelRowsPerPage="Itens por página"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          colSpan={3}
          count={13}
          rowsPerPage={5}
          page={1}
          onChangePage={() => console.log('onChangePage')}
          onChangeRowsPerPage={() => console.log('onChangeRowsPerPage')}
        />
      </TableRow>
    </TableFooter>
  );

  render() {
    const { tabConfig, dataset } = this.props;

    const columnsTitles = tabConfig.map(item => item.columnTitle);
    const dataFields = tabConfig.map(item => item.dataField);

    return (
      <Container>
        <Table>
          {this.renderHeader([...columnsTitles, ''])}
          {this.renderRows(dataset, dataFields)}
        </Table>
        <PaginationWraper>
          {this.renderFooter()}
        </PaginationWraper>
      </Container>
    );
  }
}

export default CustomTable;
