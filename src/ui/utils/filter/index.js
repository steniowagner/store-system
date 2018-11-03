// @flow

import functionalFilter from './functionalFilter';
import numericFilter from './numericFilter';
import textFilter from './textFilter';
import dateFilter from './dateFilter';

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
    datasetFiltered = functionalFilter(filterConfig);
  }

  if (type === FILTER_TYPES.NUMERIC) {
    datasetFiltered = numericFilter(filterConfig);
  }

  if (type === FILTER_TYPES.TEXT) {
    datasetFiltered = textFilter(filterConfig);
  }

  if (type === FILTER_TYPES.DATE.ID) {
    datasetFiltered = dateFilter(filterConfig, FILTER_TYPES.DATE.WHEN);
  }

  return datasetFiltered;
};
