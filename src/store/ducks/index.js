import { combineReducers } from 'redux';

import debits from './customerDebits';
import social from './social';
import customer from './customer';
import provider from './provider';
import cashier from './cashier';
import product from './product';
import alerts from './alerts';
import backup from './backup';
import budget from './budget';
import print from './print';
import stock from './stock';
import brand from './brand';
import auth from './auth';
import user from './user';
import sale from './sale';

export default combineReducers({
  customer,
  provider,
  cashier,
  product,
  social,
  alerts,
  backup,
  budget,
  debits,
  brand,
  print,
  stock,
  auth,
  sale,
  user,
});
