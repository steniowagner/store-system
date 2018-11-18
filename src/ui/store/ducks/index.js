import { combineReducers } from 'redux';

import customer from './customer';
import provider from './provider';
import budget from './budget';
import user from './user';

export default combineReducers({
  customer,
  provider,
  budget,
  user,
});
