// @flow

import moment from 'moment';

export const getNewCashierOperationData = (value: string, reason: string, type: string): Object => ({
  valueText: `R$ ${parseFloat(value).toFixed(2)}`,
  value: parseFloat(value),
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
});

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

export const calculateTotalProfit = (sales: Array<Object>): number => {
  let totalProfit = 0;

  const salesProducts = sales.map(sale => sale.products);

  salesProducts.forEach((saleProducts) => {
    totalProfit += saleProducts.reduce((current, product) => current + ((product.salePrice - product.costPrice) * product.quantity), 0);
  });

  return totalProfit;
};

export const calculateTotalCashierOperationValue = (dataset: Array<Object>): number => {
  const total = dataset.reduce((current, operation) => current + operation.value, 0);

  return total;
};

export const calculateTotalInputMoney = (addMoneyOperations: Array<Object>, salesOperations: Array<Object>): number => {
  const totalAddMoneyOperations = calculateTotalCashierOperationValue(addMoneyOperations);
  const totalSalesOperations = salesOperations.reduce((current, sale) => current + getTotalPaymentValue(sale.paymentInfo), 0);

  return totalAddMoneyOperations + totalSalesOperations;
};
