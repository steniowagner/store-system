import { combineReducers } from 'redux';

import provider from './provider';
import budget from './budget';
import user from './user';

export default combineReducers({
  provider,
  budget,
  user,
});
