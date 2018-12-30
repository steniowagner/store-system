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
  placeholder: 'Enter the Description of the Product you are looking for',
  type: FILTER_TYPES.TEXT,
  dataField: 'description',
  filterTitle: 'Product',
}, {
  placeholder: 'These are the Products that are above the min quantity',
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'above',
  filterTitle: 'Above',
  behavior: filterByMinStockQuantityAboveLimit,
}, {
  placeholder: 'These are the Products that are on the limit of quantity',
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'limit',
  filterTitle: 'On the Limit',
  behavior: filterByMinStockQuantityOnTheEdge,
}, {
  placeholder: 'These are the Products that are under the min quantity',
  type: FILTER_TYPES.FUNCTIONAL,
  dataField: 'under',
  filterTitle: 'Under',
  behavior: filterByMinStockQuantityUnderLimit,
}];

export default filterConfig;
