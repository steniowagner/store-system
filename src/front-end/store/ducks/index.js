import { combineReducers } from 'redux';

import debits from './customerDebits';
import customer from './customer';
import provider from './provider';
import cashier from './cashier';
import product from './product';
import alerts from './alerts';
import backup from './backup';
import budget from './budget';
import stock from './stock';
import brand from './brand';
import user from './user';
import sale from './sale';

export default combineReducers({
  customer,
  provider,
  cashier,
  product,
  alerts,
  backup,
  budget,
  debits,
  brand,
  stock,
  sale,
  user,
});
