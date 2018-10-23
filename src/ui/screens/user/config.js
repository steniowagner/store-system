import { FILTER_TYPES } from '../../components/common/Filter';

export const tabConfig = [{
  columnTitle: 'Nome',
  dataField: 'name',
}, {
  columnTitle: 'Usuário',
  dataField: 'username',
}];

export const filterConfig = [{
  filterTitle: 'Nome',
  dataField: 'name',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'Usuário',
  dataField: 'username',
  type: FILTER_TYPES.TEXT,
}];
