import { FILTER_TYPES } from '../../utils/filter';

export const tabConfig = [{
  columnTitle: 'Descrição',
  dataField: 'description',
}, {
  columnTitle: 'Marca',
  dataField: 'brand',
}, {
  columnTitle: 'Fabricante',
  dataField: 'manufacturer',
}];

export const filterConfig = [{
  filterTitle: 'Código de Barras',
  dataField: 'barCode',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'Descrição',
  dataField: 'description',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'Marca',
  dataField: 'brand',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'Fabricante',
  dataField: 'manufacturer',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'Categoria',
  dataField: 'category',
  type: FILTER_TYPES.TEXT,
}];
