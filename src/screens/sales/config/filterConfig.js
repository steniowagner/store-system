// @flow

import { FILTER_TYPES } from '../../../utils/filter';

const filterSalesWithDebit = (sales: Array<Object>): Array<Object> => sales.filter(sale => sale.inDebit > 0);

const filterConfig = [{
  placeholder: 'Enter the name of the Salesman',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Salesman',
  dataField: 'salesman',
}, {
  placeholder: 'Enter the name of the Customer',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Customer',
  dataField: 'customerName',
}, {
  placeholder: 'Enter the Sale\'s Code',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Code',
  dataField: 'code',
}, {
  placeholder: 'Sales with Debit',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'In Debit',
  dataField: 'debit',
  behavior: filterSalesWithDebit,
}];

export default filterConfig;
