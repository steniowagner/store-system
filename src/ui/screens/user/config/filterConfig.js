import { FILTER_TYPES } from '../../../utils/filter';

const filterConfig = [{
  placeholder: 'Informe o Nome do Usuário Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Nome',
  dataField: 'name',
}, {
  placeholder: 'Informe o Nome de Usuário Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Usuário',
  dataField: 'username',
}];

export default filterConfig;
