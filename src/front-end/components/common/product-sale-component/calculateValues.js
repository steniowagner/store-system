// @flow

export const getDiscountByMoney = (value: number): number => value;

export const getDiscountByPercentage = (subTotal: number, value: number): number => {
  const percentage = (value / 100);
  const discountValue = (subTotal * percentage);

  return discountValue;
};

export const calculateSubtotalValue = (products: Array<Object>): number => {
  const subTotal = products.reduce((current, product) => current + (product.salePrice * product.quantity), 0);

  return subTotal;
};

export const calculateTotalValue = (discount: Object, subTotal: number): number => {
  const { value, type } = discount;

  const discountValue = (type === 'percentage'
    ? getDiscountByPercentage(subTotal, value)
    : getDiscountByMoney(value));

  const discountEqualsSubtotal = ((subTotal - discountValue) === 0);

  if (discountEqualsSubtotal) {
    return 0;
  }

  const total = (subTotal - discountValue);

  return (total || subTotal);
};
