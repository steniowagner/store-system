import { FILTER_TYPES } from '../../utils/filter';

export const tabConfig = [{
  columnTitle: 'Nome',
  dataField: 'name',
}, {
  columnTitle: 'Endereço',
  dataField: 'address',
}, {
  columnTitle: 'Cidade',
  dataField: 'city',
}];

export const filterConfig = [{
  filterTitle: 'Nome',
  dataField: 'name',
  type: FILTER_TYPES.TEXT,
}];
