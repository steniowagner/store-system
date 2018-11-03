// @flow

type Config = {
  dataset: Array<Object>,
  operator: string,
  filter: string,
  value: string,
};

const filterWithNumbers = (filterConfig: Config): Array<Object> => {
  const {
    operator,
    dataset,
    filter,
    value,
  } = filterConfig;

  const verifyOperatorValue = {
    '<': (val, currentValue) => value > currentValue,
    '>=': (val, currentValue) => value >= currentValue,
    '=': (val, currentValue) => value === currentValue,
    '>': (val, currentValue) => value < currentValue,
    '<=': (val, currentValue) => value <= currentValue,
  };

  const datasetFiltered = dataset.filter(product => verifyOperatorValue[operator](value, product[filter]));

  return datasetFiltered;
};

export default filterWithNumbers;
