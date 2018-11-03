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
  filterTitle: 'Usuário',
  dataField: 'username',
  type: FILTER_TYPES.TEXT,
}, {
  placeholder: 'Informe a Data em questão',
  filterTitle: 'Antes do Dia...',
  dataField: 'date',
  time: 'before',
  type: FILTER_TYPES.DATE,
}, {
  placeholder: 'Informe a Data em questão',
  filterTitle: 'No Dia...',
  dataField: 'date',
  time: 'same',
  type: FILTER_TYPES.DATE,
}, {
  placeholder: 'Informe a Data em questão',
  filterTitle: 'Depois do Dia...',
  dataField: 'date',
  time: 'after',
  type: FILTER_TYPES.DATE,
}];
