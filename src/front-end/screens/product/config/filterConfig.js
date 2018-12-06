import { FILTER_TYPES } from '../../../utils/filter';

const filterConfig = [{
  placeholder: 'Informe o Código de Barras do Produto Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Código de Barras',
  dataField: 'barCode',
}, {
  placeholder: 'Informe a Descrição do Produto Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Descrição',
  dataField: 'description',
}, {
  placeholder: 'Informe a Marca do Produto Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Marca',
  dataField: 'brandName',
}];

export default filterConfig;
