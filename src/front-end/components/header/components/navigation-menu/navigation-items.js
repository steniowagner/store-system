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
  title: 'CAIXA',
  route: '/dashboard/cashier',
}, {
  Icon: ShoppingCart,
  title: 'VENDAS',
  route: '/dashboard/sale',
}, {
  Icon: LocalOffer,
  title: 'PRODUTOS',
  route: '/dashboard/product',
}, {
  Icon: Stock,
  title: 'ESTOQUE',
  route: '/dashboard/stock',
}, {
  Icon: Assignment,
  title: 'ORÇAMENTOS',
  route: '/dashboard/budget',
}, {
  Icon: People,
  title: 'CLIENTES',
  route: '/dashboard/customer',
}, {
  Icon: LocalShipping,
  title: 'FORNECEDORES',
  route: '/dashboard/provider',
}, {
  Icon: AccountCircle,
  title: 'USUÁRIOS',
  route: '/dashboard/user',
}];

export default items;
