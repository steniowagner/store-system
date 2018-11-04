// @flow

type Config = {
  dataset: Array<Object>,
  operator: string,
  filter: string,
  value: string,
};

const numericFilter = (filterConfig: Config): Array<Object> => {
  const {
    operator,
    dataset,
    filter,
    value,
  } = filterConfig;

  const verifyOperatorValue = {
    '<': (_, currentValue) => value > currentValue,
    '>=': (_, currentValue) => value >= currentValue,
    '=': (_, currentValue) => value === currentValue,
    '>': (_, currentValue) => value < currentValue,
    '<=': (_, currentValue) => value <= currentValue,
  };

  const datasetFiltered = dataset.filter(product => verifyOperatorValue[operator](value, product[filter]));

  return datasetFiltered;
};

export default numericFilter;
