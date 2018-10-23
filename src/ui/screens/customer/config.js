import { FILTER_TYPES } from '../../components/common/Filter';

export const tabConfig = [{
  columnTitle: 'Nome',
  dataField: 'name',
}, {
  columnTitle: 'CPF',
  dataField: 'cpf',
}, {
  columnTitle: 'RG',
  dataField: 'rg',
}];

export const filterConfig = [{
  filterTitle: 'Nome',
  dataField: 'name',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'CPF',
  dataField: 'cpf',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'RG',
  dataField: 'rg',
  type: FILTER_TYPES.TEXT,
}];
