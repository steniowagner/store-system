// @flow

import filterWithNumbers from './numeric';
import filterWithText from './text';

export const FILTER_TYPES = {
  FUNCTIONAL: 'FUNCTIONAL',
  NUMERIC: 'NUMERIC',
  DATE: 'DATE',
  TEXT: 'TEXT',
};

export const filterList = (filterConfig: Object): Array<Object> => {
  const { type } = filterConfig;

  let datasetFiltered = [];

  if (type === FILTER_TYPES.NUMERIC) {
    datasetFiltered = filterWithNumbers(filterConfig);
  }

  if (type === FILTER_TYPES.TEXT) {
    datasetFiltered = filterWithText(filterConfig);
  }

  console.log(datasetFiltered)

  return datasetFiltered;
};
