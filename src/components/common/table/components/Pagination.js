// @flow

import React from 'react';

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';

import TablePagination from '@material-ui/core/TablePagination';

import styled from 'styled-components';

const PaginationWraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PaginationActionsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
`;

type Props = {
  onChangeRowsPerPage: Function,
  onPageChange: Function,
  datasetLength: number,
  rowsPerPage: number,
  currentPage: number,
};

const onFirstPageClicked = (onPageChange: Function): void => {
  onPageChange(0);
};

const onLastPageClicked = (onPageChange: Function, datasetLength: number, rowsPerPage: number): void => {
  const lastPage = Math.max(0, Math.ceil(datasetLength / rowsPerPage) - 1);
  onPageChange(lastPage);
};

const onNextPageClicked = (onPageChange: Function, currentPage: number): void => {
  onPageChange(currentPage + 1);
};

const onPreviousPageClicked = (onPageChange: Function, currentPage: number): void => {
  onPageChange(currentPage - 1);
};

const renderPageControlls = (onPageChange: Function, datasetLength: number, currentPage: number, rowsPerPage: number): Object => {
  const isOnLastPage = (currentPage >= Math.ceil(datasetLength / rowsPerPage) - 1);
  const isOnFirstPage = (currentPage === 0);

  return (
    <PaginationActionsWrapper>
      <IconButton
        onClick={() => onFirstPageClicked(onPageChange, currentPage)}
        disabled={isOnFirstPage}
        aria-label="First Page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={() => onPreviousPageClicked(onPageChange, currentPage)}
        disabled={isOnFirstPage}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => onNextPageClicked(onPageChange, currentPage)}
        disabled={isOnLastPage}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => onLastPageClicked(onPageChange, datasetLength, rowsPerPage)}
        disabled={isOnLastPage}
        aria-label="Last Page"
      >
        <LastPageIcon />
      </IconButton>
    </PaginationActionsWrapper>
  );
};

const Pagination = ({
  onChangeRowsPerPage,
  datasetLength,
  onPageChange,
  rowsPerPage,
  currentPage,
}: Props) => {
  const PageControlls = renderPageControlls(onPageChange, datasetLength, currentPage, rowsPerPage);

  return (
    <PaginationWraper>
      <TablePagination
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        onChangeRowsPerPage={event => onChangeRowsPerPage(event.target.value)}
        ActionsComponent={() => PageControlls}
        labelRowsPerPage="Items per Page"
        rowsPerPageOptions={[5, 10]}
        rowsPerPage={rowsPerPage}
        count={datasetLength}
        page={currentPage}
        onChangePage={() => {}}
        component="div"
        colSpan={3}
      />
    </PaginationWraper>
  );
};

export default Pagination;
