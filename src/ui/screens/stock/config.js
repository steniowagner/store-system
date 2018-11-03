import { FILTER_TYPES } from '../../utils/filter';

export const tabConfig = [{
  columnTitle: 'Produto',
  dataField: 'description',
}, {
  columnTitle: 'Quantidade Atual em Estoque',
  dataField: 'stockQuantity',
}, {
  columnTitle: 'Quantidade Mínima em Estoque',
  dataField: 'minStockQuantity',
}];

const filterByMinStockQuantityAboveLimit = (products: Array<Object>): Array<Object> => products.filter(
  product => product.stockQuantity > product.minStockQuantity,
);

const filterByMinStockQuantityUnderLimit = (products: Array<Object>): Array<Object> => products.filter(
  product => product.stockQuantity < product.minStockQuantity,
);

const filterByMinStockQuantityOnTheEdge = (products: Array<Object>): Array<Object> => products.filter(
  product => product.stockQuantity === product.minStockQuantity,
);

export const filterConfig = [{
  filterTitle: 'Nome',
  dataField: 'description',
  type: FILTER_TYPES.TEXT,
}, {
  filterLabel: 'Produtos que estão Acima da Quantidade Mínima',
  behavior: filterByMinStockQuantityAboveLimit,
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'minStockQuantity',
  filterTitle: 'Acima',
}, {
  filterLabel: 'Produtos que estão no Limite da Quantidade Mínima',
  behavior: filterByMinStockQuantityOnTheEdge,
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'minStockQuantity',
  filterTitle: 'No Limite',
}, {
  filterLabel: 'Produtos que estão Abaixo da Quantidade Mínima',
  behavior: filterByMinStockQuantityUnderLimit,
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'minStockQuantity',
  filterTitle: 'Abaixo',
}];
