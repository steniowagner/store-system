import { FILTER_TYPES } from '../../components/common/Filter';

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
  filterTitle: 'Acima',
  dataField: 'minStockQuantity',
  type: FILTER_TYPES.FUNCTIONAL,
  behavior: filterByMinStockQuantityAboveLimit,
}, {
  filterLabel: 'Produtos que estão no Limite da Quantidade Mínima',
  filterTitle: 'No Limite',
  dataField: 'minStockQuantity',
  type: FILTER_TYPES.FUNCTIONAL,
  behavior: filterByMinStockQuantityOnTheEdge,
}, {
  filterLabel: 'Produtos que estão Abaixo da Quantidade Mínima',
  filterTitle: 'Abaixo',
  dataField: 'minStockQuantity',
  type: FILTER_TYPES.FUNCTIONAL,
  behavior: filterByMinStockQuantityUnderLimit,
}];
