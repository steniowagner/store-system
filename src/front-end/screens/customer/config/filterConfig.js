import { FILTER_TYPES } from '../../../utils/filter';

const filterInDebit = (customers: Array<Object>): Array<Object> => customers.filter(customer => !!customer.isInDebit);

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
}, {
  placeholder: 'Estes são todos os Clientes em Débito',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Em Débito',
  behavior: filterInDebit,
}];

export default filterConfig;
