// @flow

import React, { Fragment } from 'react';

import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const SectionTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkText};
`;

const ValueText = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme, color }) => theme.colors[color]};
`;

const DiscountValueWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DiscountValueText = styled.span`
  margin-right: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};
`;

const renderValueRow = (valueTextColor: string, message: string, value: string): Object => (
  <SectionWrapper>
    <SectionTitle>
      {message}
    </SectionTitle>
    <ValueText
      color={valueTextColor}
    >
      {`$ ${value}`}
    </ValueText>
  </SectionWrapper>
);

const renderSubtotal = (subtotal: string): Object => renderValueRow('danger', 'Sub-total', subtotal);

const renderTotal = (total: string): Object => renderValueRow('darkText', 'Total to Pay', total);

const renderDiscount = (discount: Object, subtotal: string): Object => {
  const { value, type } = discount;

  let discountValue;
  let discountText;

  if (type === 'percentage') {
    const percentage = (value / 100);

    discountValue = Number(subtotal) * percentage;
    discountText = `(${value}%)`;
  }

  if (type === 'money') {
    discountValue = Number(subtotal) - value;
    discountText = `($ ${value.toFixed(2)})`;
  }

  const subtotalWithDiscount = `$ ${discountValue.toFixed(2)}`;

  return (
    <Fragment>
      <SectionWrapper>
        <SectionTitle>
          Discount
        </SectionTitle>
        <DiscountValueWrapper>
          <DiscountValueText>
            {discountText}
          </DiscountValueText>
          <ValueText
            color="danger"
          >
            {subtotalWithDiscount}
          </ValueText>
        </DiscountValueWrapper>
      </SectionWrapper>
      <Divider light />
    </Fragment>
  );
};

type Props = {
  discount: Object,
  subtotal: string,
  total: string,
};

const SaleValues = ({ discount, total, subtotal }: Props): Object => {
  const hasDiscount = (!!discount.type && !!discount.value);

  return (
    <Container>
      {renderSubtotal(subtotal)}
      <Divider light />
      {hasDiscount && renderDiscount(discount, subtotal)}
      {renderTotal(total)}
    </Container>
  );
};

export default SaleValues;
