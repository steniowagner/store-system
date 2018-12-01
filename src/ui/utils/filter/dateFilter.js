// @flow

import moment from 'moment';

type Config = {
  dataset: Array<Object>,
  filterSelected: string,
  value: string,
}

const getBeforeDateItems = (dataset: Array<Object>, value: Object): Array<Object> => dataset.filter((item) => {
  const itemDateParsed = moment(item.createdAt.substring(0, 10), 'YYYY-MM-DD').toDate();
  return moment(itemDateParsed).isBefore(value);
});

const getSameDateItems = (dataset: Array<Object>, value: Object): Array<Object> => dataset.filter((item) => {
  const itemDateParsed = moment(item.createdAt.substring(0, 10), 'YYYY-MM-DD').toDate();
  return moment(itemDateParsed).isSame(value);
});

const getAfterDateItems = (dataset: Array<Object>, value: Object): Array<Object> => dataset.filter((item) => {
  const itemDateParsed = moment(item.createdAt.substring(0, 10), 'YYYY-MM-DD').toDate();
  return moment(itemDateParsed).isAfter(value);
});

const filterWithDate = (config: Config, DATE_TYPES: Object): Array<Object> => {
  const { filterSelected, dataset, value } = config;

  const dateParsed = moment(value, 'L').toDate();

  let datasetFilteredByDate = [];

  if (filterSelected === DATE_TYPES.BEFORE) {
    datasetFilteredByDate = getBeforeDateItems(dataset, dateParsed);
  }

  if (filterSelected === DATE_TYPES.SAME) {
    datasetFilteredByDate = getSameDateItems(dataset, dateParsed);
  }

  if (filterSelected === DATE_TYPES.AFTER) {
    datasetFilteredByDate = getAfterDateItems(dataset, dateParsed);
  }

  return datasetFilteredByDate;
};

export default filterWithDate;
