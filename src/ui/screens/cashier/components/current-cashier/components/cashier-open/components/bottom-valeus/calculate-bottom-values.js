// @flow

import { getTotalPaymentValue } from '../../cashier-utils';

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
