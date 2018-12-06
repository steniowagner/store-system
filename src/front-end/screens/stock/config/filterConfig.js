// @flow

import { FILTER_TYPES } from '../../../utils/filter';

const filterByMinStockQuantityAboveLimit = (products: Array<Object>): Array<Object> => products.filter(
  product => product.stockQuantity > product.minStockQuantity,
);

const filterByMinStockQuantityUnderLimit = (products: Array<Object>): Array<Object> => products.filter(
  product => product.stockQuantity < product.minStockQuantity,
);

const filterByMinStockQuantityOnTheEdge = (products: Array<Object>): Array<Object> => products.filter(
  product => product.stockQuantity === product.minStockQuantity,
);

const filterConfig = [{
  placeholder: 'Informe o Nome do Produto Buscado',
  type: FILTER_TYPES.TEXT,
  dataField: 'description',
  filterTitle: 'Produto',
}, {
  placeholder: 'Produtos que estão Acima da Quantidade Mínima',
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'above',
  filterTitle: 'Acima',
  behavior: filterByMinStockQuantityAboveLimit,
}, {
  placeholder: 'Informe o Nome de Usuáro Buscado',
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'limit',
  filterTitle: 'No Limite',
  behavior: filterByMinStockQuantityOnTheEdge,
}, {
  placeholder: 'Informe o Nome de Usuáro Buscado',
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'under',
  filterTitle: 'Abaixo',
  behavior: filterByMinStockQuantityUnderLimit,
}];

export default filterConfig;
