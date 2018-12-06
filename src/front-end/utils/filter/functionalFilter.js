// @flow

type Config = {
  dataset: Array<Object>,
  behavior: Function,
};

const functionalFilter = (config: Config): Array<Object> => {
  const { behavior, dataset } = config;

  return behavior(dataset);
};

export default functionalFilter;
