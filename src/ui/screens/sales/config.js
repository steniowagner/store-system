// @flow

import { FILTER_TYPES } from '../../utils/filter';

export const tabConfig = [{
  columnTitle: 'Cliente',
  dataField: 'customerName',
}, {
  columnTitle: 'Data',
  dataField: 'dateToShow',
}, {
  columnTitle: 'Usuário',
  dataField: 'username',
}, {
  columnTitle: 'Sub-total',
  dataField: 'subtotal',
}, {
  columnTitle: 'Total',
  dataField: 'total',
}];

export const filterConfig = [{
  placeholder: 'Informe o Nome de Usuáro do Usuário Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Usuário',
  dataField: 'username',
}, {
  placeholder: 'Informe a Data em questão',
  dataField: FILTER_TYPES.DATE.WHEN.BEFORE,
  type: FILTER_TYPES.DATE.ID,
  filterTitle: 'Antes do Dia...',
  field: 'date',
}, {
  placeholder: 'Informe a Data em questão',
  dataField: FILTER_TYPES.DATE.WHEN.SAME,
  type: FILTER_TYPES.DATE.ID,
  filterTitle: 'No Dia...',
  field: 'date',
}, {
  placeholder: 'Informe a Data em questão',
  dataField: FILTER_TYPES.DATE.WHEN.AFTER,
  type: FILTER_TYPES.DATE.ID,
  filterTitle: 'Depois do Dia...',
  field: 'date',
}];
