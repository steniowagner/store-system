import React, { Component, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';


import styled from 'styled-components';

const Container = styled(Paper)`
  width: 100%;
  overflow-x: auto;
  margin-top: 48px;
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

class CustomTable extends Component {
  state = {
    fieldKeys: [],
  };

  componentDidMount() {
    const fieldKeys = this.getKeys({
      name: 'Stenio',
      age: 21,
      address: 'Travessa Vitória 1',
    });

    this.setState({
      fieldKeys,
    });
  }

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

  renderRowCell = (row: Object): Object => {
    const { fieldKeys } = this.state;
    const rowData = [...fieldKeys, 'actions'];

    return (
      <Fragment>
        {rowData.map(key => (
          <TableCell
            variant="body"
            key={row.id + key}
            numeric={key === 'actions'}
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

  renderRows = (rows: Array<string>): Object => (
    <TableBody>
      {rows.map((row, index) => (
        <BodyRow
          index={index}
          key={row.id}
        >
          {this.renderRowCell(row)}
        </BodyRow>
      ))}
    </TableBody>
  );

  renderFooter = (): Object => (
    <TableFooter>
      <TableRow>
        <TablePagination
          labelRowsPerPage="Usuários por página"
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
    const columnsTitles = ['Name', 'Age', 'Address', ''];
    const rows = [{
      id: '1',
      name: 'Stenio',
      age: 23,
      address: 'Travessa Vitória 1',
    }, {
      id: '12',
      name: 'Ana Eridan',
      age: 23,
      address: 'Travessa Vitória 2',
    }, {
      id: '13',
      name: 'Manoel Elisval',
      age: 24,
      address: 'Travessa Vitória 3',
    }];

    return (
      <Container>
        <Table>
          {this.renderHeader(columnsTitles)}
          {this.renderRows(rows)}
        </Table>
        <PaginationWraper>
          {this.renderFooter()}
        </PaginationWraper>
      </Container>
    );
  }
}

export default CustomTable;
