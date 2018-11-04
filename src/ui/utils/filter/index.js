// @flow

import handleFunctionalFilter from './functionalFilter';
import handleNumericFilter from './numericFilter';
import handleTextFilter from './textFilter';
import handleDateFilter from './dateFilter';

export const FILTER_TYPES = {
  FUNCTIONAL: 'FUNCTIONAL',
  NUMERIC: 'NUMERIC',
  DATE: {
    ID: 'DATE',
    WHEN: {
      BEFORE: 'BEFORE',
      SAME: 'SAME',
      AFTER: 'AFTER',
    },
  },
  TEXT: 'TEXT',
};

export const filterList = (filterConfig: Object): Array<Object> => {
  const { type } = filterConfig;

  let datasetFiltered = [];

  if (type === FILTER_TYPES.FUNCTIONAL) {
    datasetFiltered = handleFunctionalFilter(filterConfig);
  }

  if (type === FILTER_TYPES.NUMERIC) {
    datasetFiltered = handleNumericFilter(filterConfig);
  }

  if (type === FILTER_TYPES.TEXT) {
    datasetFiltered = handleTextFilter(filterConfig);
  }

  if (type === FILTER_TYPES.DATE.ID) {
    datasetFiltered = handleDateFilter(filterConfig, FILTER_TYPES.DATE.WHEN);
  }

  return datasetFiltered;
};
