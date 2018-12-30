import { FILTER_TYPES } from '../../../utils/filter';

const filterConfig = [{
  placeholder: 'Enter the Barcode',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Barcode',
  dataField: 'barcode',
}, {
  placeholder: 'Enter the Description',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Description',
  dataField: 'description',
}, {
  placeholder: 'Enter the Brand',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Brand',
  dataField: 'brandName',
}];

export default filterConfig;
