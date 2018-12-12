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
  route: '/cashier',
}, {
  Icon: ShoppingCart,
  title: 'VENDAS',
  route: '/sale',
}, {
  Icon: LocalOffer,
  title: 'PRODUTOS',
  route: '/product',
}, {
  Icon: Stock,
  title: 'ESTOQUE',
  route: '/stock',
}, {
  Icon: Assignment,
  title: 'ORÇAMENTOS',
  route: '/budget',
}, {
  Icon: People,
  title: 'CLIENTES',
  route: '/customer',
}, {
  Icon: LocalShipping,
  title: 'FORNECEDORES',
  route: '/provider',
}, {
  Icon: AccountCircle,
  title: 'USUÁRIOS',
  route: '/user',
}];

export default items;
