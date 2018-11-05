import { FILTER_TYPES } from '../../../utils/filter';

const filterConfig = [{
  placeholder: 'Informe o Nome do Cliente Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Nome',
  dataField: 'name',
}, {
  placeholder: 'Informe o CPF do Cliente Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'CPF',
  dataField: 'cpf',
}, {
  placeholder: 'Informe o RG do Cliente Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'RG',
  dataField: 'rg',
}];

export default filterConfig;
