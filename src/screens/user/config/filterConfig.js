import { FILTER_TYPES } from '../../../utils/filter';

const filterConfig = [{
  placeholder: 'Enter the Name of the User you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Name',
  dataField: 'name',
}, {
  placeholder: 'Enter the Username of the User you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Username',
  dataField: 'username',
}];

export default filterConfig;
