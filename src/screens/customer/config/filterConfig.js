import { FILTER_TYPES } from '../../../utils/filter';

const filterInDebit = (customers: Array<Object>): Array<Object> => customers.filter(customer => !!customer.isInDebit);

const filterConfig = [{
  placeholder: 'Enter the Name of the Customer you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Name',
  dataField: 'name',
}, {
  placeholder: 'Enter the CPF of the Customer you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'CPF',
  dataField: 'cpf',
}, {
  placeholder: 'Enter the RG of the Customer you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'RG',
  dataField: 'rg',
}, {
  placeholder: 'These are all Customers in Debit',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'In Debit',
  behavior: filterInDebit,
}];

export default filterConfig;
