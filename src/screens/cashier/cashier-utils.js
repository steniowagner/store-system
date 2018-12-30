// @flow

import moment from 'moment';

import { CASHIER_OPERATIONS } from './components/current-cashier/components/cashier-open/components/top-buttons-values/dialog-config';

export const getNewCashierOperationData = (value: string, reason: string, username: string, type: string): Object => ({
  valueText: `$ ${parseFloat(value).toFixed(2)}`,
  timestampText: moment().calendar(),
  dateToShow: moment().format('lll'),
  value: parseFloat(value),
  salesman: username,
  id: Math.random(),
  customerName: '-',
  discountText: '-',
  inDebitText: '-',
  valuePaid: '-',
  totalText: '-',
  code: '-',
  reason,
  type,
});

const getTotalPaymentValue = (paymentInfo: Object): number => {
  const valuePaid = Object.keys(paymentInfo).reduce((current, item) => current + Number(paymentInfo[item]), 0);

  return valuePaid;
};

const getDiscountText = ({ type, value }) => {
  let discountText = '-';

  if (type === 'percentage') {
    discountText = `${value}%`;
  }

  if (type === 'money') {
    discountText = `$ ${Number(value).toFixed(2)}`;
  }

  return discountText;
};

export const parseSaleTableItem = (sale: Object): Object => {
  const {
    createdFromBudget,
    paymentInfo,
    customer,
    discount,
    subtotal,
    inDebit,
    total,
  } = sale;

  const discountText = getDiscountText(discount);
  const valuePaid = getTotalPaymentValue(paymentInfo);

  return {
    ...sale,
    valueText: `$ ${Number(subtotal).toFixed(2)}`,
    customerName: (customer ? customer.name : '-'),
    inDebitText: `$ ${Math.abs(inDebit).toFixed(2)}`,
    totalText: `$ ${Number(total).toFixed(2)}`,
    valuePaid: `$ ${valuePaid.toFixed(2)}`,
    timestampText: moment().calendar(),
    type: (createdFromBudget ? CASHIER_OPERATIONS.CONSOLIDATE_BUDGET_PAYMENT : CASHIER_OPERATIONS.SALE),
    discountText,
  };
};

export const calculateTotalProfit = (sales: Array<Object>): number => {
  const salesProducts = sales.map(sale => sale.products);

  const totalProfit = salesProducts.reduce((total, saleProducts) => {
    return total + saleProducts.reduce((current, product) => {
      const profit = product.salePrice - product.costPrice;
      return current + (profit * product.quantity);
    }, 0);
  }, 0);

  return totalProfit;
};
