// @flow

type Config = {
  dataset: Array<Object>,
  filter: string,
  value: string,
};

const textFilter = (filterConfig: Config): Array<Object> => {
  const {
    dataset,
    filter,
    value,
  } = filterConfig;

  if (filter === 'all') return dataset;

  const regexSubstring = new RegExp(value, 'i');

  const datasetFiltered = dataset.filter(item => regexSubstring.test(item[filter]));

  return datasetFiltered;
};

export default textFilter;
