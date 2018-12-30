import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalShipping from '@material-ui/icons/LocalShipping';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Stock from '@material-ui/icons/PlaylistAddCheck';
import Assignment from '@material-ui/icons/Assignment';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Contacts from '@material-ui/icons/Contacts';
import People from '@material-ui/icons/People';

const items = [{
  Icon: Contacts,
  title: 'CASHIER',
  route: '/dashboard/cashier',
}, {
  Icon: ShoppingCart,
  title: 'SALES',
  route: '/dashboard/sale',
}, {
  Icon: LocalOffer,
  title: 'PRODUCTS',
  route: '/dashboard/product',
}, {
  Icon: Stock,
  title: 'STOCK',
  route: '/dashboard/stock',
}, {
  Icon: Assignment,
  title: 'BUDGETS',
  route: '/dashboard/budget',
}, {
  Icon: People,
  title: 'CUSTOMERS',
  route: '/dashboard/customer',
}, {
  Icon: LocalShipping,
  title: 'PROVIDERS',
  route: '/dashboard/provider',
}, {
  Icon: AccountCircle,
  title: 'USERS',
  route: '/dashboard/user',
}];

export default items;
