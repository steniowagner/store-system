// @flow

import moment from 'moment';

export const getNewCashierOperationData = (value: string, reason: string, type: string): Object => {
  const newCashierOperation = {
    valueText: `R$ ${Number(value).toFixed(2)}`,
    value: Number(value),
    timestamp: moment().calendar(),
    username: 'swmyself',
    id: Math.random(),
    customerName: '-',
    discountText: '-',
    valuePaid: '-',
    totalText: '-',
    pending: '-',
    reason,
    type,
  };

  return newCashierOperation;
};

export const getTotalPaymentValue = (paymentInfo: Object): number => {
  const valuePaid = Object.keys(paymentInfo).reduce((current, item) => current + Number(paymentInfo[item]), 0);

  return valuePaid;
};

export const parseSaleTableItem = (sale: Object): Object => {
  const {
    paymentInfo,
    customer,
    discount,
    subtotal,
    total,
  } = sale;
  const { type, value } = discount;

  const discountText = (type === 'percentage' ? `${value}%` : `R$ ${Number(value).toFixed(2)}`);

  const valuePaid = getTotalPaymentValue(paymentInfo);
  const pending = valuePaid - total;

  return {
    ...sale,
    valueText: `R$ ${Number(subtotal).toFixed(2)}`,
    pending: `R$ ${Math.abs(pending).toFixed(2)}`,
    valuePaid: `R$ ${valuePaid.toFixed(2)}`,
    customerName: customer.name,
    totalText: `R$ ${total}`,
    discountText,
    type: 'Venda',
  };
};
