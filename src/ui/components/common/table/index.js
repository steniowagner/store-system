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
  onVisualizeIconClicked: Function,
  onRemoveIconClicked: Function,
  onEditIconClicked: Function,
  updatePageIndex: Function,
  tabConfig: Array<Object>,
  dataset: Array<any>,
  currentPage: number,
};

type State = {
  rowsPerPage: number,
};

class CustomTable extends Component<Props, State> {
  state = {
    rowsPerPage: 5,
  };

  onChangeRowsPerPage = (rowsPerPage: number): void => {
    this.setState({
      rowsPerPage,
    });
  };

  renderActionsSection = (item: Object): Object => {
    const { onEditIconClicked, onVisualizeIconClicked, onRemoveIconClicked } = this.props;
    const { rowsPerPage } = this.state;

    return (
      <ActionButtonsWrapper>
        <IconButton
          onClick={() => onEditIconClicked(item)}
          aria-label="Edit"
          disableRipple
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => onVisualizeIconClicked(item)}
          aria-label="Search"
          disableRipple
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          onClick={() => onRemoveIconClicked(item, rowsPerPage)}
          aria-label="Delete"
          disableRipple
        >
          <DeleteIcon />
        </IconButton>
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
