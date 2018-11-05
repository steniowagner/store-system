// @flow

import { FILTER_TYPES } from '../../../utils/filter';

const filterSalesWithDebit = (sales: Array<Object>): Array<Object> => sales.filter(sale => sale.isInDebit);

const filterConfig = [{
  placeholder: 'Informe o Nome de Usuáro Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Usuário',
  dataField: 'username',
}, {
  placeholder: 'Informe o Nome do Cliente Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Cliente',
  dataField: 'customerName',
}, {
  placeholder: 'Vendas que estão em Débito',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Em Débito',
  dataField: 'debit',
  behavior: filterSalesWithDebit,
}, {
  placeholder: 'Informe a Data em questão',
  type: FILTER_TYPES.DATE.ID,
  filterTitle: 'Antes do Dia...',
  dataField: FILTER_TYPES.DATE.WHEN.BEFORE,
  field: 'date',
}, {
  placeholder: 'Informe a Data em questão',
  type: FILTER_TYPES.DATE.ID,
  filterTitle: 'No Dia...',
  dataField: FILTER_TYPES.DATE.WHEN.SAME,
  field: 'date',
}, {
  placeholder: 'Informe a Data em questão',
  type: FILTER_TYPES.DATE.ID,
  filterTitle: 'Depois do Dia...',
  dataField: FILTER_TYPES.DATE.WHEN.AFTER,
  field: 'date',
}];

export default filterConfig;
